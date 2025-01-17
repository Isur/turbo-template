import { CustomHttpException } from "src/core/exceptions/httpException";

export class FileNotFoundException extends CustomHttpException {
  constructor() {
    super("File not found", 404, "FILE_NOT_FOUND");
  }
}

export class FileRemoveException extends CustomHttpException {
  constructor() {
    super("File could not be deleted!", 500, "FILE_NOT_DELETED");
  }
}

export class FileNotUploaded extends CustomHttpException {
  constructor() {
    super("File was not provided!", 400, "FILE_NOT_PROVIDED");
  }
}
