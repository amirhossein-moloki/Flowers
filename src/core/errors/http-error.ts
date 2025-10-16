import { AppError } from './app-error';

export class HttpError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }

  static badRequest(message = 'Bad Request'): HttpError {
    return new HttpError(message, 400);
  }

  static unauthorized(message = 'Unauthorized'): HttpError {
    return new HttpError(message, 401);
  }

  static forbidden(message = 'Forbidden'): HttpError {
    return new HttpError(message, 403);
  }

  static notFound(message = 'Not Found'): HttpError {
    return new HttpError(message, 404);
  }

  static internalServerError(message = 'Internal Server Error'): HttpError {
    return new HttpError(message, 500);
  }
}