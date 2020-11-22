import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '../types/payload';
import { UserService } from '../shared/user.service';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      plateNumber: user.plateNumber,
      driver: user.driver,
      technician: user.technician,
    };

    const token = await this.authService.signByPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      driver: user.driver,
      technician: user.technician,
    };
    const token = await this.authService.signByPayload(payload);
    return { user, token };
  }
}
