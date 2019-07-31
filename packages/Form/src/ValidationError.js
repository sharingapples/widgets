class ValidationError extends Error {
  constructor(name) {
    super(`Validation Error on ${name}`);
  }
}

export default ValidationError;
