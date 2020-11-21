import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payload } from '../types/payload';
import { UserService } from '../shared/user.service';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { User } from 'src/utilities/user.decorator';
import { TechnicianGuard } from '../guards/technician.guard';
import { DriverGuard } from '../guards/driver.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), TechnicianGuard, DriverGuard)
  async findAll(@User() user: any) {
    console.log(user);
    return this.userService.findAll();
  }

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
