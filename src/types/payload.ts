export interface Payload {
  username: string;
  driver: boolean;
  technician: boolean;
  plateNumber?: string;
  iat?: number;
  expiresIn?: string;
};
