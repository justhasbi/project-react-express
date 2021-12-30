const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown Endpoint' })
};

// Logger middleware
const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('-----');
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Invalid ID' }).end();
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { unknownEndpoint, requestLogger, errorHandler }