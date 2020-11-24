import { Document } from 'mongoose';
import { User } from './user';

export interface DriverService extends Document {
  owner: string;
  price: number;
  driver: any;
  serviceDate: Date;
}
