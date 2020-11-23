import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarService } from 'src/types/car-service';
import { DriverService } from 'src/types/driver-service';
import { User } from 'src/types/user';
import { CarServiceDTO, DriverDTO } from './car-service.dto';

@Injectable()
export class CarServicingService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('CarService') private carServiceModel: Model<CarService>,
    @InjectModel('DriverService') private driverService: Model<DriverService>,
  ) {}

  async findAllTechnicians() {
    return await this.userModel.find({ technician: true });
  }

  async findAllAlternateDrivers() {
    return await this.userModel.find({ driver: true });
  }

  async serviceOrder(CarServiceDTO: CarServiceDTO) {
    const getTechnician = await this.userModel.findOne({
      technician: true,
      availability: true,
    }); // find one available technician
    console.log('availableTechnician =', getTechnician);
    if (!getTechnician) {
      Logger.log('no technicians are available at this moment');
    }
    const service = new this.carServiceModel(CarServiceDTO);
    const assignTechnician = await service.update(
      { _id: service.id },
      {
        technicians: getTechnician,
      },
    );
    getTechnician.update({ availability: false }); // change availability status to false (unavailable)
    return await assignTechnician.save();
  }

  async drivingOrder(driverDTO: DriverDTO) {
    const driver = await this.userModel.findOne({
      driver: true,
      availability: true,
    }); //find one available driver
    console.log('availableDriver =', driver);
    if (!driver) {
      Logger.log('no drivers are available at this moment');
    }
    const driveService = new this.driverService(driverDTO);
    const assignDriver = await driveService.update(
      { _id: driveService.id },
      { driver: driver },
    );
    driver.update({ availability: false }); // change availability status to false (unavailable)
    return await assignDriver.save();
  }
}
