import * as mongoose from 'mongoose';
import axios from 'axios';
import * as request from 'supertest';
import { CarServicingService } from '../src/car-service/car-service.service';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from './test-utils';
import { MongooseModule } from '@nestjs/mongoose';
import { CarServiceSchema } from '../src/models/car-service.schema';
import { DriverServiceSchema } from '../src/models/driver-order.schema';
import { app } from './constants';
import { LoginDTO, RegisterDTO } from '../src/auth/auth.dto';

import { CreateCarServiceDTO } from '../src/car-service/car-service.dto';
import { User } from 'src/types/user';
import { HttpStatus } from '@nestjs/common';
import { UserService } from '../src/shared/user.service';
import { UserSchema } from '../src/models/user.schema';

describe('service', () => {
  let carService: CarServicingService;

  const loginTech: LoginDTO = {
    username: 'technicianOrder',
    password: 'technicianOrder',
  };

  const loginDriver: LoginDTO = {
    username: 'driverOrder',
    password: 'driverOrder',
  };

  const techLogin = axios.post(`${app}/auth/login`, loginTech);

  const driverLogin = axios.post(`${app}/auth/login`, loginDriver);

  const createService = {
    price: 100,
    technicians: [techLogin],
    serviceDate: new Date('12/12/2020'),
  };

  const assignDriver = {
    price: 20,
    driver: driverLogin,
    serviceDate: new Date('12/12/2020'),
  };

  let orderId: string;
  let technicianToken: string;
  let driverToken: string;
  let userToken: string;
  let user: RegisterDTO = {
    username: 'userTest1',
    password: 'userTest1',
    plateNumber: 'QKT2333',
    driver: false,
    technician: false,
    availability: false,
  };

  let technician: RegisterDTO = {
    username: 'techTest1',
    password: 'techTest1',
    plateNumber: 'WOO2331',
    driver: false,
    technician: true,
    availability: true,
  };

  let driver: RegisterDTO = {
    username: 'driverTest1',
    password: 'driverTest1',
    plateNumber: 'WOR1122',
    driver: true,
    technician: false,
    availability: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'CarService', schema: CarServiceSchema },
        ]),
        MongooseModule.forFeature([
          { name: 'DriverService', schema: DriverServiceSchema },
        ]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [CarServicingService, UserService],
    }).compile();
    carService = module.get<CarServicingService>(CarServicingService);
    const {
      data: { token },
    } = await axios.post(`${app}/auth/register`, user);
    userToken = token;
  });

  describe('CarService', () => {
    it('should list all technicians', async () => {
      return request(app).get('/car-service/getAlltechnicians').expect(200);
    });

    it('should list all drivers', async () => {
      return request(app).get('/car-service/getAllDrivers').expect(200);
    });

    it('should list available technicians', async () => {
      return request(app)
        .get('/car-service/getAvailableTechnician')
        .expect(200);
    });
    it('should list available drivers', async () => {
      return request(app).get('/car-service/getAvailableDriver').expect(200);
    });
    it('should create new CarService order', () => {
      return request(app)
        .post('/car-service/ServiceOrder')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .send(createService)
        .expect(({ body }) => {
          expect(body._id).toBeDefined();
          orderId = body._id;
          expect(body.price).toEqual(createService.price);
          expect(body.technicians).toEqual(createService.technicians);
          expect(body.serviceDate).toEqual(createService.serviceDate);
          expect(body.owner).toEqual(user.plateNumber);
        })
        .expect(HttpStatus.CREATED);
    });
  });
});
