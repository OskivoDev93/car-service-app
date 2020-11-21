import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TechnicianGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.technician) {
      return true;
    }
    throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
  }
}
