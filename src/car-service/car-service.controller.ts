import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCarServiceDTO, CreateDriverDTO } from './car-service.dto';
import { CarServicingService } from './car-service.service';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../guards/user.guard';
import { TechnicianGuard } from '../guards/technician.guard';
import { DriverGuard } from '../guards/driver.guard';
import { User } from '../utilities/user.decorator';

@Controller('car-service')
export class CarServiceController {
  constructor(private carService: CarServicingService) {}

  @Get('getAllTechnicians')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async getAllTechnicians() {
    await this.carService.findAllTechnicians();
  }

  @Get('getAllDrivers')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async getAllDrivers() {
    await this.carService.findAllAlternateDrivers();
  }

  @Get('getAvailableTechnician')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async getAvailableTechnician() {
    await this.carService.findavailableTechnicians();
  }

  @Get('getAvailableDriver')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async getAvailableDrivers() {
    await this.carService.findavailableDrivers();
  }

  @Post('ServiceOrder')
  @UseGuards(AuthGuard('jwt'))
  async createService(@Body() order: CreateCarServiceDTO, @User('_id') user) {
    console.log('user =', user);
    await this.carService.serviceOrder(order, user);
  }

  @Post('AssignAlternateDriver')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async assignAlternateDriver(
    @Body() order: CreateDriverDTO,
    @User('_id') user,
  ) {
    await this.carService.drivingOrder(order, user);
  }

  @Delete('deleteCarService')
  @UseGuards(AuthGuard('jwt'), TechnicianGuard)
  async deleteCarService(@Param('id') id: string) {
    return this.carService.deleteCarServiceOrder(id);
  }

  @Delete('deleteCarService')
  @UseGuards(AuthGuard('jwt'), DriverGuard)
  async deleteDriverAssignOrder(@Param('id') id: string) {
    return this.carService.deleteDriverAssignOrder(id);
  }
}
