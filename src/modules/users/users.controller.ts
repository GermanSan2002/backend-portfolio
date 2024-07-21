import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { HasRoles } from '../../common/decorators/has-roles.decorator';
import { Role } from '../../constants/role.enum';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('users/all')
  async findAllUsers(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAllUsers(paginationQuery);
  }

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('users/:id')
  async findOneUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOneUser(id);
  }

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch('users/edit/:id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete('users/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
