import { User } from '../types/user';

export interface CreateCarServiceDTO {
  price: number;
  technicians: User[];
  serviceDate: Date;
}

export interface CreateDriverDTO {
  price: number;
  driver: User;
  serviceDate: Date;
}

export type updateCarServiceDTO = Partial<CreateCarServiceDTO>;

export type updateDriverDTO = Partial<CreateDriverDTO>;