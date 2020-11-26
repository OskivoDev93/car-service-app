export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  carType: string;
  plateNumber: string;
  technician?: boolean;
  driver?: boolean;
  availability: boolean;
}
