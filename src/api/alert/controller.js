const VError = require("verror");

async function getAlert(req, res, next) {
  try {
    res.json({});
  } catch (err) {
    next(new VError(err, "Failed to get the alert"));
  }
}

async function createAlert(req, res, next) {
  try {
    res.json({});
  } catch (err) {
    next(new VError(err, "Failed to create alert"));
  }
}

module.exports = {
  getAlert,
  createAlert
};
