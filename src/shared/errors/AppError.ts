export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly validation: any;

  constructor(message: string, statusCode = 400, validation?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.validation = validation;
  }
}
