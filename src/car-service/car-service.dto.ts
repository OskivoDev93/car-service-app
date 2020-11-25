import { LoginDTO } from 'src/auth/auth.dto';
import { User } from '../types/user';

export interface CreateCarServiceDTO {
  price: number;
  serviceDate: string;
}

export interface CreateDriverDTO {
  price: number;
  serviceDate: string;
}

export type updateCarServiceDTO = Partial<CreateCarServiceDTO>;

export type updateDriverDTO = Partial<CreateDriverDTO>;