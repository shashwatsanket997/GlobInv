// Custom Errors

class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

class ValidationError extends CustomError {
  constructor(errorType, errors, statusCode = 400) {
    super("Validation Error");
    this.errors = errors;
    this.errorType = errorType;
    this.statusCode = statusCode;
  }
  prepareResponse() {
    return {
      errorType: this.message,
      errors: this.errors
    };
  }
}

class AuthorizationError extends CustomError {
  constructor() {
    super("Unauthorized");
    this.error = "Access token missing or invalid";
    this.statusCode = 401;
  }
  prepareResponse() {
    return {
      error: this.error
    };
  }
}

class NotFoundError extends CustomError {
  constructor() {
    super("404 Not Found");
    this.errors = ["Object Id not found"];
    this.statusCode = 404;
  }
  prepareResponse() {
    return {
      status: this.message,
      errors: this.errors
    };
  }
}

module.exports.CustomError = CustomError;
module.exports.ValidationError = ValidationError;
module.exports.AuthorizationError = AuthorizationError;
module.exports.NotFoundError = NotFoundError;
