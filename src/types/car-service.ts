import { Document } from 'mongoose';
import { User } from './user';

export interface CarService extends Document {
  owner: string;
  price: number;
  technicians: User[];
  serviceDate: Date;
}
