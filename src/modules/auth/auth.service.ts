import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ErrorManager } from 'src/utils/error.manager';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    try {
      return await this.userService.login(loginUserDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async logout() {
    return { message: 'Sesión cerrada correctamente' };
  }
}
