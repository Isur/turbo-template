type ErrorApiType = {
  status: number;
  code: string;
  message: string;
  timestamp: Date;
  path: string;
  method: string;
};

export class ApiError extends Error implements ErrorApiType {
  status: number;
  code: string;
  timestamp: Date;
  path: string;
  method: string;

  constructor(error: ErrorApiType) {
    super(error.message);
    this.status = error.status;
    this.code = error.code;
    this.timestamp = error.timestamp;
    this.path = error.path;
    this.method = error.method;
  }
}
