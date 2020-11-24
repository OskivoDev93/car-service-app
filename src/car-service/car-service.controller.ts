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
import { User as UserDocument } from '../types/user';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '../guards/user.guard';
import { TechnicianGuard } from 'src/guards/technician.guard';
import { DriverGuard } from 'src/guards/driver.guard';

@Controller('car-service')
export class CarServiceController {
  constructor(private carService: CarServicingService) {}

  @Get('getAllTechnicians')
  async getAllTechnicians() {
    await this.carService.findAllTechnicians();
  }

  @Get('getAllDrivers')
  async getAllDrivers() {
    await this.carService.findAllAlternateDrivers();
  }

  @Get('getAvailableTechnician')
  async getAvailableTechnician() {
    await this.carService.findavailableTechnicians();
  }

  @Get('AvailableDrivers')
  async getAvailableDrivers() {
    await this.carService.findavailableDrivers();
  }

  @Post('ServiceOrder')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async createService(@Body() order: CreateCarServiceDTO, user: UserDocument) {
    await this.carService.serviceOrder(order, user);
  }

  @Post('AssignAlternateDriver')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async assignAlternateDriver(
    @Body() order: CreateDriverDTO,
    user: UserDocument,
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
