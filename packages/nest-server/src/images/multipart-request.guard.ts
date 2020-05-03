import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MultipartRequestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isMultipart = request.is('multipart/form-data');
    if (!isMultipart) {
      throw new BadRequestException(
        `Request must be 'multipart/form-data'. Recieved '${request.get('Content-Type')}'`,
      );
    }
    return isMultipart;
  }
}
