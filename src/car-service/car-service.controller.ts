import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { CarServicingService } from './car-service.service';

@Controller('car-service')
export class CarServiceController {
  constructor(
    private carService: CarServicingService,
    private userService: UserService,
  ) {}

  @Get()
  async getAllTechnicians() {
    await this.carService.findAllTechnicians();
  }

  @Get()
  async getAllDrivers() {
    await this.carService.findAllAlternateDrivers();
  }

  @Post()
  async createService(@Body() order: any) {
    await this.carService.serviceOrder(order);
  }

  @Post()
  assignAlternateDriver() {}

  @Put(':id')
  update() {}

  @Delete(':id')
  delete() {}
}
