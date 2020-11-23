import { User } from '../types/user';

export interface CarServiceDTO {
  owner: string;
  price: number;
  technicians: User[];
  serviceDate: Date;
}

export interface DriverDTO {
  owner: string;
  price: number;
  driver: User;
  serviceDate: Date;
}
