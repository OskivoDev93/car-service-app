import { LoginDTO } from 'src/auth/auth.dto';
import { User } from '../types/user';

export interface CreateCarServiceDTO {
  owner: User;
  price: number;
  serviceDate: string;
  technician: User;
}

export interface CreateDriverDTO {
  owner: User;
  price: number;
  serviceDate: string;
  driver: User;
}

export type updateCarServiceDTO = Partial<CreateCarServiceDTO>;

export type updateDriverDTO = Partial<CreateDriverDTO>;