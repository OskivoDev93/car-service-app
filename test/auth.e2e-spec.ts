import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';
import { LoginDTO, RegisterDTO } from '../src/auth/auth.dto';
import * as request from 'supertest';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import { UserService } from '../src/shared/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { closeInMongodConnection, rootMongooseTestModule } from './test-utils';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../src/models/user.schema';

const app = 'http://localhost:3000';

describe('Auth', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Auth', () => {
    const user: RegisterDTO = {
      username: 'jimmy',
      password: 'eatworld',
    };

    const technicianUserReg: RegisterDTO = {
      username: 'technician1',
      password: 'techician1',
      plateNumber: 'AFD1231',
      technician: true,
    };

    const technicianUserLogIn: LoginDTO = {
      username: 'technician1',
      password: 'techician1',
    };

    let userToken: string;
    let technicianToken: string;

    it('the app should register the user', () => {
      return request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.user.username).toEqual('jimmy');
          expect(body.user.technician).toBeFalsy();
        })
        .expect(HttpStatus.CREATED);
    });

    it('it should register the technician', () => {
      return request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(technicianUserReg)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.user.username).toEqual('technician1');
          expect(body.user.technician).toBeTruthy();
        })
        .expect(HttpStatus.CREATED);
    });

    it('should reject duplicate registration', () => {
      return request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(user)
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should login user', async () => {
      return request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          userToken = body.token;
          expect(body.token).toBeDefined();
          expect(body.user.username).toEqual('jimmy');
          expect(body.user.technician).toBeFalsy();
        })
        .expect(HttpStatus.CREATED);
    });

    it('should login technician', async () => {
      return request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(technicianUserLogIn)
        .expect(({ body }) => {
          technicianToken = body.token;
          expect(body.token).toBeDefined();
          expect(body.user.username).toEqual('technician1');
          expect(body.user.technician).toBeTruthy();
        })
        .expect(HttpStatus.CREATED);
    });
    it('should not login', async () => {
      const user: LoginDTO = {
        username: 'jimmy4',
        password: 'nottherightOne',
      };
      return request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async (done) => {
    await closeInMongodConnection();
    await mongoose.disconnect(done);
  });
});
