import { CustomHttpException } from "src/exceptions/httpException";

export class TodoNotFoundException extends CustomHttpException {
  constructor() {
    super("Todo not found", 404, "TODO_NOT_FOUND");
  }
}
