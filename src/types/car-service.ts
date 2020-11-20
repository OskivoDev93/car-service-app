import { Document } from 'mongoose';
import { User } from './user';

export interface CarService extends Document {
  owner: User;
  price: number;
  date: Date;
  technician: User[];
}
