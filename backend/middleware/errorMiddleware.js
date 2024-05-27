module.exports = function errorMiddleware(err, req, res, next) {
  const defaultError = {
    statusCode: 404,
    success: 'failed',
    message: err,
  };

  if (err?.name === 'ValidationError') {
    defaultError.statusCode = 400; // Changed status code for validation error

    defaultError.message = Object.values(err.errors) // Assuming the errors are stored in err.errors
      .map((el) => el.message)
      .join(',');
  }

  // Duplicate key error handling remains the same

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400; // Changed status code for duplicate key error

    defaultError.message = `${Object.values(
      err.keyValue
    )} field has to be unique!`;
  }

  res.status(defaultError.statusCode).json({
    success: defaultError.success,
    message: defaultError.message,
  });
};
