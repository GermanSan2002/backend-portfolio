import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { LoginUserDto } from '../auth/dto/login-auth.dto';
import { comparePassword, hashPassword } from '../../utils/password';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { Pagination } from 'src/common/pagination';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../constants/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (findUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El email ya existe',
        });
      }
      createUserDto.password = await hashPassword(createUserDto.password);
      const user = await this.userRepository.save(createUserDto);
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          role: Role.SuperAdmin,
          email: loginUserDto.email,
        },
      });
      if (!findUser) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Usuario no encontrado',
        });
      }

      const isCorrectPassword = await comparePassword(
        loginUserDto.password,
        findUser.password,
      );
      if (!isCorrectPassword) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Contraseña incorrecta',
        });
      }

      const tokens = await this.getTokens(
        findUser.id,
        findUser.email,
        findUser.role,
      );

      const data = {
        user: findUser,
        tokens,
      };

      return data;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAllUsers(
    paginationQuery: PaginationQueryDto,
  ): Promise<UserEntity[] | unknown> {
    try {
      if (Object.keys(paginationQuery).length > 0) {
        const { page, limit, role, name, last_name, email } = paginationQuery;
        const offSet = (page - 1) * limit;
        const users = await this.userRepository.find({
          where: {
            role: role,
            name: name ? Like(`%${name}%`) : undefined,
            last_name: last_name ? Like(`%${last_name}%`) : undefined,
            email: email ? Like(`%${email}%`) : undefined,
          },
          order: {
            createdAt: 'DESC',
          },
          skip: offSet,
          take: limit,
        });
        if (users.length === 0) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se encontro resultados',
          });
        }
        const totalUsers = await this.userRepository.count({
          where: {
            role: role,
            name: name ? Like(`%${name}%`) : undefined,
            last_name: last_name ? Like(`%${last_name}%`) : undefined,
            email: email ? Like(`%${email}%`) : undefined,
          },
        });
        const usersCreatedAt = users.map((user) => {
          return { ...user, created_at: user.createdAt };
        });
        return Pagination(usersCreatedAt, totalUsers, paginationQuery);
      } else {
        const users = await this.userRepository.find({
          order: {
            createdAt: 'DESC',
          },
        });
        if (users.length === 0) {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: 'No se encontro resultados',
          });
        }
        const usersCreatedAt = users.map((user) => {
          return { ...user, created_at: user.createdAt };
        });
        return usersCreatedAt;
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOneUser(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo encontrar (findOneUser)',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOneById(id: string): Promise<any> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        select: [
          'id',
          'name',
          'last_name',
          'email',
          'profile_photo',
          'createdAt',
        ],
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo encontrar (findOneById)',
        });
      }
      const resultUser = {
        id: user.id,
        name: `${user.name} ${user.last_name}`,
        email: user.email,
        profile_photo: user.profile_photo,
        creationDate: user.createdAt,
      };
      return resultUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(
        id,
        updateUserDto,
      );
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: UserEntity = await this.userRepository.findOne({
        select: [
          'id',
          'name',
          'last_name',
          'email',
          'profile_photo',
          'createdAt',
        ],
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo encontrar (findOneById)',
        });
      }
      const userDeleted: DeleteResult = await this.userRepository.delete(id);
      if (userDeleted.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return userDeleted;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getTokens(id: string, email: string, role?: string) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          email,
          role,
        },
        {
          expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      accessToken,
    };
  }
}
