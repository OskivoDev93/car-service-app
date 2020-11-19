import { Document } from 'mongoose';
import { User } from './user';
import { Technician } from './technician';
interface Technicians {
    technician: Technician;
    quantity: number;
}
export interface CarService extends Document {
    owner: User;
    pricing: number;
    service: Technicians[];
    date: Date;
}
export {};
