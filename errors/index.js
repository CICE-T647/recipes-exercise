class ExtendableError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else { 
        this.stack = (new Error(message)).stack; 
      }
    }
  }  

  module.exports.ParameterError = class ParameterError extends ExtendableError{}
  module.exports.NotFoundError = class NotFoundError extends ExtendableError{}