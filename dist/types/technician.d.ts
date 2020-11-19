import { Document } from 'mongoose';
import { User } from './user';
export interface Technician extends Document {
    technician: User;
    availability: boolean;
}
