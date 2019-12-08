"use strict";
const { getCommonRequestDetails } = require("../utils");

/**
 * Handles all errors from the requests
 * @param {HttpException} err
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
function errorHandler(err, req, res, next) {
  const { args, name, status, message, stack } = err;

  logger.error(
    {
      request: getCommonRequestDetails(req),
      error: {
        name,
        message,
        args,
        stack
      }
    },
    `Failed to process the request to ${req.method} ${req.url}`
  );
  res.status(status || 500).json({
    message
  });
}

module.exports = {
  errorHandler
};
