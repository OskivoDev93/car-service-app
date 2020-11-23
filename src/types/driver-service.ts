import { Document } from 'mongoose';
import { User } from './user';

export interface DriverService extends Document {
  owner: User;
  price: number;
  date: Date;
  driver: User;
}