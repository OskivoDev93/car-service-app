import * as request from 'supertest';
import { app } from './constants';

describe('ROOT', () => {
  it('ping', () => {
    return request(app).get('/').expect(200).expect({
      hello: 'world',
    });
  });
});
