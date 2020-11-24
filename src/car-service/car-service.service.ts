import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarService } from '../types/car-service';
import { DriverService } from '../types/driver-service';
import { User } from 'src/utilities/user.decorator';
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
    return { result };
  }

  async findAllAlternateDrivers() {
    const result = await this.userModel.find({ driver: true });
    console.log('alternateDrivers =', result);
    return { result };
  }

  async findavailableTechnicians() {
    const result = await this.userModel.find({
      technician: true,
      availability: true,
    });
    console.log('availableTechnicians =', result);
    return { result };
  }

  async findavailableDrivers() {
    const result = await this.userModel.find({
      driver: true,
      availability: true,
    });
    console.log('availableDrivers =', result);
    return { result };
  }

  async serviceOrder(
    CarServiceDTO: CreateCarServiceDTO,
    @User() user: UserDocument,
  ) {
    const getTechnician = await this.userModel.findOne({
      technician: true,
      availability: true,
    }); // find one available technician
    console.log('availableTechnician =', getTechnician);
    if (!getTechnician) {
      Logger.log('no technicians are available at this moment');
    }
    const { plateNumber } = user;
    const service = await this.carServiceModel.create({
      ...CarServiceDTO,
      owner: plateNumber,
    });
    const assignTechnician = await service.update(
      { _id: service.id },
      {
        technicians: getTechnician,
      },
    );
    getTechnician.update({ availability: false }); // change availability status to false (unavailable)
    return await assignTechnician.save();
  }

  async drivingOrder(driverDTO: CreateDriverDTO, @User() user: UserDocument) {
    const driver = await this.userModel.findOne({
      driver: true,
      availability: true,
    }); //find one available driver
    console.log('availableDriver =', driver);
    if (!driver) {
      Logger.log('no drivers are available at this moment');
    }
    const { plateNumber } = user;
    const createService = await this.driverService.create({
      ...driverDTO,
      owner: plateNumber,
    });
    const assignDriver = await createService.update(
      { _id: createService.id },
      { driver: driver },
    );
    driver.update({ availability: false }); // change availability status to false (unavailable)
    return await assignDriver.save();
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
