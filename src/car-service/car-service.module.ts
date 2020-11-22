import { Module } from '@nestjs/common';
import { CarServiceController } from './car-service.controller';
import { CarServiceService } from './car-service.service';

@Module({
  controllers: [CarServiceController],
  providers: [CarServiceService]
})
export class CarServiceModule {}
