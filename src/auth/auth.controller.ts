import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../shared/user.service';

@Controller('auth')
export class AuthController {

    constructor(private userService: UserService) {

    }

    @Post('login')
    async login(@Body() userDTO: any) {
        return this.userService.findByLogin(userDTO);
    }

    @Post('register')
    async register(@Body() userDTO: any) {
        return await this.userService.create(userDTO)
    }
}
