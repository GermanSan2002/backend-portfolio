import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { HasRoles } from '../../common/decorators/has-roles.decorator';
import { Role } from '../../constants/role.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @HasRoles(Role.SuperAdmin, Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('auth/logout')
  async logout() {
    return await this.authService.logout();
  }
}
