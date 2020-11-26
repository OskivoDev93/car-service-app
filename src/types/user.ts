import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  readonly password: string;
  technician: boolean;
  driver: boolean;
  carType: string;
  plateNumber: string;
  created: Date;
  availability: boolean;
}
