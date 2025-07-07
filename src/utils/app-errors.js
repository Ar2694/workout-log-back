const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    name,
    statusCode,
    message,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    name,
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    message = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}

//400
class BadRequestError extends AppError {
  constructor(message = "Bad request", logingErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODES.BAD_REQUEST,
      message,
      true,
      false,
      logingErrorResponse
    );
  }
}

//400
class ValidationError extends AppError {
  constructor(message = "Validation Error", errorStack) {
    super(
      "BAD REQUEST",
      STATUS_CODES.BAD_REQUEST,
      message,
      true,
      errorStack
    );
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
};
