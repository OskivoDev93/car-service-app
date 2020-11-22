import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarService } from 'src/types/car-service';
import { User } from 'src/types/user';

@Injectable()
export class CarServicingService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('CarService') private carServiceModel: Model<CarService>,
  ) {}

  async findAllTechnicians() {
    return await this.userModel.find({ technician: true });
  }

  async findAllAlternateDrivers() {
    return await this.userModel.find({ driver: true });
  }

  async createService(CarServiceDTO: any) {
    const service = await this.carServiceModel.create(CarServiceDTO);
    await service.save();
  }
}
