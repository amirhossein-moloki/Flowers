import { AppError } from '../errors/app-error';

export class HttpError extends AppError {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  public static badRequest(message = 'Bad Request'): HttpError {
    return new HttpError(400, message);
  }

  public static unauthorized(message = 'Unauthorized'): HttpError {
    return new HttpError(401, message);
  }

  public static forbidden(message = 'Forbidden'): HttpError {
    return new HttpError(403, message);
  }

  public static notFound(message = 'Not Found'): HttpError {
    return new HttpError(404, message);
  }

  public static internalServerError(message = 'Internal Server Error'): HttpError {
    return new HttpError(500, message);
  }
}
