import BaseError from "./BaseError.js";

class IncorrectRequest extends BaseError {
  constructor() {
    super("One or more of the given informations are incorrect", 400);
  }
}

export default IncorrectRequest;