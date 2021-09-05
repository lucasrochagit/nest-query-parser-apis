import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const { ENV } = process.env;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const generic_exception_body = {
      message: 'An internal error occurred. Please try again later.',
      details: exception.toString(),
    };

    if (ENV === 'prod') {
      delete generic_exception_body.details;
    }

    const generic_exception = new InternalServerErrorException(
      generic_exception_body,
    );

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : generic_exception.getStatus();

    const body =
      exception instanceof HttpException
        ? exception.getResponse()
        : generic_exception.getResponse();

    response.status(status).json(body);
  }
}
