import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { User } from '../types/user';
import * as bcrypt from 'bcrypt';
import { Payload } from '../types/payload';
import { callbackify } from 'util';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitize(user: User) {
    return user.depopulate('password');
  };

  async create(UserDTO: RegisterDTO) {
    const { username } = UserDTO;
    const user = await this.userModel.findOne({ username });
    console.log('user =', user);
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(UserDTO);
    if (!createdUser.technician || !createdUser.driver) {
      this.userModel.update(
        { _id: createdUser.id },
        { $unset: { availability: undefined } },
      );
    }
    createdUser.save();
    return this.sanitize(createdUser);
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { username, password } = UserDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitize(user);
    } else {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return this.userModel.findOne({ username });
  }
}
