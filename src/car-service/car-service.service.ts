import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarService } from '../types/car-service';
import { DriverService } from '../types/driver-service';
import { User, User as UserDocument } from '../types/user';
import { CreateCarServiceDTO, CreateDriverDTO } from './car-service.dto';

@Injectable()
export class CarServicingService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('CarService') private carServiceModel: Model<CarService>,
    @InjectModel('DriverService') private driverService: Model<DriverService>,
  ) {}

  private async findAvailableTechnician() {
    const getTechnician = await this.userModel.findOne({
      technician: true,
      availability: true,
    }); // find one available technician
    if (!getTechnician) {
      return Logger.log('no available technician at this time');
    }
    getTechnician.availability = false;
    return getTechnician.save();
  }

  private async findAvailableDriver() {
    const driver = await this.userModel.findOne({
      driver: true,
      availability: true,
    });
    if (!driver) {
      return Logger.log('no available drivers at this time');
    }
    driver.availability = false;
    return driver.save();
  }

  async findAllTechnicians() {
    const result = await this.userModel.find({ technician: true });
    console.log('technicians =', result);
    return {
      allTechnicians: result,
    };
  }

  async findAllAlternateDrivers() {
    const result = await this.userModel.find({ driver: true });
    console.log('alternateDrivers =', result);
    return {
      allDrivers: result,
    };
  }

  async findavailableTechnicians() {
    const result = await this.userModel.find({
      technician: true,
      availability: true,
    });
    console.log('availableTechnicians =', result);
    return {
      availableTechnicians: result,
    };
  }

  async findavailableDrivers() {
    const result = await this.userModel.find({
      driver: true,
      availability: true,
    });
    console.log('availableDrivers =', result);
    return {
      availableDrivers: result,
    };
  }

  async serviceOrder(CarServiceDTO: CreateCarServiceDTO, user: User) {
    const { carType } = user;
    if (carType === 'SUV') {
      const technician1 = await this.findAvailableTechnician();
      const technician2 = await this.findAvailableTechnician();
      const service = new this.carServiceModel({
        ...CarServiceDTO,
        owner: user,
        technicians: [technician1, technician2],
      });
      console.log('service SUV =', service.technicians);
      return await service.save();
    } else if (carType === 'HATCHBACK ' || carType === 'SEDAN') {
      const technician = await this.findAvailableTechnician();
      const service = new this.carServiceModel({
        ...CarServiceDTO,
        owner: user,
        technicians: [technician],
      });
      console.log("service sedan =", service.technicians);
      return await service.save();
    }
  }

  async drivingOrder(driverDTO: CreateDriverDTO, user: User) {
    const driver = this.findAvailableDriver();
    const createService = new this.driverService({
      ...driverDTO,
      owner: user,
      driver: driver,
    });
    return await createService.save();
  }

  async deleteCarServiceOrder(id: string): Promise<CarService> {
    const order = await this.carServiceModel.findById(id);
    const changeAvailabilityStatus = await order.update({
      availability: true,
    });
    changeAvailabilityStatus.save();
    return await order.remove();
  }

  async deleteDriverAssignOrder(id: string): Promise<DriverService> {
    const order = await this.driverService.findById(id);
    const changeAvailabilityStatus = await order.update({ availability: true });
    changeAvailabilityStatus.save();
    return await order.remove();
  }
}
