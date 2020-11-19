import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import { User } from 'src/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    private sanitize(user: User) {
        return user.depopulate('password');
    }

    async create(UserDTO: RegisterDTO) {
        const {username} = UserDTO;
        const user = await this.userModel.findOne({username});
        if(user){
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);

        }
        const createdUser = new this.userModel(UserDTO);
        return this.sanitize(createdUser)
    }

    async findByLogin(UserDTO: LoginDTO) {
        const {username,password} = UserDTO;
        const user = await this.userModel.findOne({username});
        if(!user) {
            throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if(await bcrypt.compare(password, user.password)) {
            return this.sanitize(user);
        } else {
            throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    }
}