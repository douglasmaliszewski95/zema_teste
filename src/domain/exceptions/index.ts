import { ErrorCodes, ErrorCode } from './error-codes';

export interface IResponseError {
  errorCode: ErrorCode;
  message: string;
  data?: any;
}

interface IException {
  errorCode: ErrorCode;
  data?: any;
}

interface IAppException extends IException {
  statusCode?: number;
  message?: string;
}

export class AppException extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly errorCode: ErrorCode;
  public readonly data: any;

  constructor({ statusCode, errorCode, message, data = undefined }: IAppException) {
    const defaultMessage = message ?? ErrorCodes[errorCode];
    super(defaultMessage);
    this.message = defaultMessage;
    this.data = data;
    this.statusCode = statusCode ?? 500;
    this.errorCode = errorCode;
  }
}

export class BadRequestException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 400, ...exception });
  }
}

export class UnauthorizedException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 401, ...exception });
  }
}

export class ForbiddenException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 403, ...exception });
  }
}

export class NotFoundException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 404, ...exception });
  }
}

export class ConflictException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 409, ...exception });
  }
}

export class UnprocessableEntityException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 422, ...exception });
  }
}

export class InternalServerErrorException extends AppException {
  constructor(exception: IException) {
    super({ statusCode: 500, ...exception });
  }
}
