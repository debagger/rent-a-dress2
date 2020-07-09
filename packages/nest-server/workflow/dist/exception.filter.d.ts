import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class ExceptionResponse {
    statusCode: number;
    path: string;
    message?: string;
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
