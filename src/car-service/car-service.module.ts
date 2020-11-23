import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { CarServiceSchema } from '../models/car-service.schema';
import { CarServiceController } from './car-service.controller';
import { CarServicingService } from './car-service.service';
import { UserSchema } from '../models/user.schema';
import { DriverServiceSchema } from 'src/models/driver-order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CarService', schema: CarServiceSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'DriverService', schema: DriverServiceSchema },
    ]),
    SharedModule,
    AuthModule,
  ],
  controllers: [CarServiceController],
  providers: [CarServicingService],
})
export class CarServiceModule {}
