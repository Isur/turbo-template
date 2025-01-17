import { CustomHttpException } from "src/core/exceptions/httpException";

/**
 * 401 Not authorized
 */
export class UnauthorizedException extends CustomHttpException {
  constructor() {
    super("User not authorized", 401, "USER_NOT_AUTHORIZED");
  }
}
