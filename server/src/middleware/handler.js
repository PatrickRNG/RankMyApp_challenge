'use strict';

const { getCommonRequestDetails } = require('../utils');

/**
 * Handles all errors from the requests
 * @param {HttpException} err
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
	const { args, name, status, message, stack } = err;

	console.error(
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

function loggingHandler(req, res, next) {
	console.log(getCommonRequestDetails(req), `Received request to ${req.method} ${req.url}`);
	next();
}

module.exports = {
	errorHandler,
	loggingHandler
};
