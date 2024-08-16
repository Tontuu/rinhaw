class BodyError extends Error {
  constructor(message, statusCode){
    super(message);
    this.statusCode = statusCode;
  }
}

class DatabaseError extends Error {
  constructor(message, stack){
    super(message);
    this.stack = stack;
  }
}

const ErrorHandler = (err, req, res, _) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({"Errinhos": {"code": statusCode, "message": err.message || "Unknown error"}});
}

module.exports = {
  BodyError,
  DatabaseError,
  ErrorHandler
}
