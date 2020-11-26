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
import { User } from '../utilities/user.decorator';

@Controller('car-service')
export class CarServiceController {
  constructor(private carService: CarServicingService) {}

  @Get('getAllTechnicians')
  @UseGuards(AuthGuard('jwt'))
  async getAllTechnicians() {
    await this.carService.findAllTechnicians();
  }

  @Get('getAllDrivers')
  @UseGuards(AuthGuard('jwt'))
  async getAllDrivers() {
    await this.carService.findAllAlternateDrivers();
  }

  @Get('getAvailableTechnician')
  @UseGuards(AuthGuard('jwt'))
  async getAvailableTechnician() {
    await this.carService.findavailableTechnicians();
  }

  @Get('getAvailableDriver')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async assignAlternateDriver(
    @Body() order: CreateDriverDTO,
    @User('_id') user,
  ) {
    await this.carService.drivingOrder(order, user);
  }

  @Delete('deleteCarService')
  @UseGuards(AuthGuard('jwt'))
  async deleteCarService(@Param('id') id: string) {
    return this.carService.deleteCarServiceOrder(id);
  }

  @Delete('deleteCarService')
  @UseGuards(AuthGuard('jwt'))
  async deleteDriverAssignOrder(@Param('id') id: string) {
    return this.carService.deleteDriverAssignOrder(id);
  }
}
