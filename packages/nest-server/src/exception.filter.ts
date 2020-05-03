import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExceptionResponse{
  @ApiProperty() statusCode: number
  @ApiProperty() path: string
  @ApiPropertyOptional() message?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const responseData: ExceptionResponse = {
      statusCode: status,
      path: request.url,
      message: exception?.message?.message
    }

    response.status(status).json(responseData);
  }
}
