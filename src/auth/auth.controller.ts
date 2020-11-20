import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../shared/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'runs' };
  }

  @Post('login')
  async login(@Body() userDTO: any) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      username: user.username,
      plateNumber: user.plateNumber,
    };

    const token = await this.authService.signByPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: any) {
    const user = await this.userService.create(userDTO);
    const payload = {
      username: user.username,
      driver: user.driver,
      technician: user.technician,
    };
    const token = await this.authService.signByPayload(payload);
    return { user, token };
  }
}
