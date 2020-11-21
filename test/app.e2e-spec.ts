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
import { LookupFunction } from 'net';

const app = 'http://localhost:3000';

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   await mongoose.connection.db.dropDatabase();
// });

// afterAll(async (done) => {
//   await mongoose.disconnect(done);
// });

describe('ROOT', () => {
  it('ping', () => {
    return request(app).get('/').expect(200).expect({
      hello: 'world',
    });
  });
});

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
    it('the app should register the user', () => {
      const user: RegisterDTO = {
        username: 'jimmy',
        password: 'eatworld',
      };

      return request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          console.log(body);
        })
        .expect(HttpStatus.CREATED);
    });
    it('should reject duplicate registration', () => {
      const user: RegisterDTO = {
        username: 'jimmy',
        password: 'eatworld',
      };

      return request(app)
        .post('/auth/register')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          console.log(body);
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should login', async () => {
      const user: LoginDTO = {
        username: 'jimmy',
        password: 'eatworld',
      };
      return request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(({ body }) => {
          expect(body.token).toBeDefined();
          expect(body.user.username).toEqual('jimmy');
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

// describe('Auth', () => {
//   it('the app should register the user', () => {
//     const user: RegisterDTO = {
//       username: 'jimmy',
//       password: 'eatworld',
//     };

//     return request(app)
//       .post('/auth/register')
//       .set('Accept', 'application/json')
//       .send(user)
//       .expect(({ body }) => {
//         expect(body.token).toBeDefined();
//         expect(body.user.username).toEqual('jimmy');
//       })
//       .expect(HttpStatus.CREATED);
//   });

//   it('should reject duplicate registration', () => {
//     const user: RegisterDTO = {
//       username: 'jimmy',
//       password: 'eatworld',
//     };

//     return request(app)
//       .post('/auth/register')
//       .set('Accept', 'application/json')
//       .send(user)
//       .expect(({ body }) => {
//         // expect(body.token).toBeDefined();
//         // expect(body.user.username).toEqual('jimmy');
//         console.log(body);
//       })
//       .expect(HttpStatus.BAD_REQUEST);
//   });

//   it('should login', async () => {
//     const user: LoginDTO = {
//       username: 'jimmy',
//       password: 'eatworld',
//     };

//     return request(app)
//       .post('/auth/login')
//       .set('Accept', 'application/json')
//       .send(user)
//       .expect(({ body }) => {
//         expect(body.token).toBeDefined();
//         expect(body.user.username).toEqual('jimmy');
//       })
//       .expect(HttpStatus.CREATED);
//   });
// });
