import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarService } from '../types/car-service';
import { DriverService } from '../types/driver-service';
import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { CreateCarServiceDTO, CreateDriverDTO } from './car-service.dto';


@Injectable()
export class CarServicingService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('CarService') private carServiceModel: Model<CarService>,
    @InjectModel('DriverService') private driverService: Model<DriverService>,
  ) {}


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

  async serviceOrder(CarServiceDTO: CreateCarServiceDTO, username: string) {
    const user = await this.userModel.findOne({ username: username });
    const getTechnician = await this.userModel.findOne({
      technician: true,
      availability: true,
    }); // find one available technician
    console.log('availableTechnician =', getTechnician);
    if (!getTechnician) {
      return Logger.log('no available technician at this time');
    } else {
      getTechnician.availability = false;
    }
    getTechnician.save();
    const service = await this.carServiceModel.create({
      ...CarServiceDTO,
      owner: user.plateNumber,
      technicians: [getTechnician],
    });
    console.log('after service');
    console.log('service =', service);
    await service.save();
    return service.populate('owner');
  }

  async drivingOrder(driverDTO: CreateDriverDTO, @User() user: UserDocument) {
    const driver = await this.userModel.findOne({
      driver: true,
      availability: true,
    }); //find one available driver
    console.log('availableDriver =', driver);
    if (!driver) {
      Logger.log('no drivers are available at this moment');
    } else {
      driver.availability = false; // change availability status to false (unavailable)
    }
    driver.save();
    const { plateNumber } = user;
    const createService = await this.driverService.create({
      ...driverDTO,
      owner: plateNumber,
      driver: driver,
    });
    return await createService.save();
  }

  async deleteCarServiceOrder(id: string): Promise<CarService> {
    const order = await this.carServiceModel.findById(id);
    const changeAvailabilityStatus = await order.update({ availability: true });
    return await changeAvailabilityStatus.remove();
  }

  async deleteDriverAssignOrder(id: string): Promise<CarService> {
    const order = await this.carServiceModel.findById(id);
    const changeAvailabilityStatus = await order.update({ availability: true });
    return await changeAvailabilityStatus.remove();
  }
}
