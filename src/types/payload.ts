export interface Payload {
  username: string;
  driver: boolean;
  technician: boolean;
  carType: string;
  plateNumber?: string;
  iat?: number;
  expiresIn?: string;
};
