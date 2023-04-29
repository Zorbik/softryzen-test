export class CustomError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export class RegistrationConflictError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}

export class NotAuthorizeError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
