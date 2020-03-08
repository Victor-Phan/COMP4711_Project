const errorLogger = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: err.message });
  } else {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  res.status(500).send(err.message);
};

module.exports = {
  errorLogger,
  clientErrorHandler,
  errorHandler
};
