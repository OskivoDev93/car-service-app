import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { CarServiceSchema } from '../models/car-service.schema';
import { CarServiceController } from './car-service.controller';
import { CarServicingService } from './car-service.service';
import { UserSchema } from '../models/user.schema';
import { DriverServiceSchema } from '../models/driver-order.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../shared/http-exception.filter';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      {
        name: 'CarService',
        schema: CarServiceSchema,
        collection: 'carServicing',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'DriverService',
        schema: DriverServiceSchema,
        collection: 'AlternateDriverDesignation',
      },
    ]),
    SharedModule,
    AuthModule,
  ],
  controllers: [CarServiceController],
  providers: [
    CarServicingService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class CarServiceModule {}
