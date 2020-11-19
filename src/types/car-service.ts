import {Document} from 'mongoose';
import { User } from './user';




export interface CarService extends Document {
    owner: User;
    pricing: number;
    date: Date;
}