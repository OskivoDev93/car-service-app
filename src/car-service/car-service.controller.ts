import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CarService } from 'src/types/car-service';

@Controller('car-service')
export class CarServiceController {
  constructor(private carService: CarService) {}

  @Get()
  getAllTechnicians() {}

  @Get()
  getAllDrivers() {}

  @Post()
  createService(){}

  @Post()
  assignAlternateDriver() {}

  @Put(':id')
  update() {}

  @Delete(':id')
  delete() {}
}
