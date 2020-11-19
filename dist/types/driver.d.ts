import { Document } from 'mongoose';
import { User } from './user';
export interface Driver extends Document {
    driverName: User;
    availability: boolean;
}
