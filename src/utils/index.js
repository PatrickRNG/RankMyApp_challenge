'use strict';

/**
 * It returns decorated request object fot better logging
 * @param {Express.Request} req
 * @returns
 */
function getCommonRequestDetails(req) {
  return {
    method: req.method,
    status: req.status,
    headers: req.headers,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query
  };
}

module.exports = {
  getCommonRequestDetails
};