import { Document } from 'mongoose';

export interface User extends Document {
  username: string;
  readonly password: string;
  technician: boolean;
  driver: boolean;
  plateNumber: string;
  created: Date;
}
