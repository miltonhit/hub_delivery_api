import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorsType } from '../exceptions/error-def.entity';
import { ServiceException } from '../exceptions/service-exception';

@Catch(ServiceException)
export class HttpServiceExceptionFilter implements ExceptionFilter {

  private checkHttpCode(exception: ServiceException) {
    var httpCode: number = 0;

    if (exception.errorDef.customHttpCode && exception.errorDef.customHttpCode > 0) {
      httpCode = exception.errorDef.customHttpCode;
    } else {
      switch(exception.errorDef.type) {
        case ErrorsType.FATAL: {
          httpCode = 500; // Internal Server Error 
          break;
        }

        case ErrorsType.LOGIC: {
          httpCode = 409; // Conflict
          break;
        }

        case ErrorsType.VALIDATION: {
          httpCode = 400; // Bad Request
          break;
        }
      }
    }

    return httpCode;
  }

  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.checkHttpCode(exception);

    console.log("AVEEEE");

    response
      .status(status)
      .json({
        code: exception.errorDef.code,
        message: [
          exception.description || exception.errorDef.description
        ]
      });
  }
}