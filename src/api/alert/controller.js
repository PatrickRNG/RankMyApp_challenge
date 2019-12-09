"use strict";

const VError = require("verror");
const AlertModel = require('./model');

/**
 * Get all alerts
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getAlert(req, res, next) {
  try {
    const alerts = await AlertModel.find({}, { _id: 0, __v: 0 }).exec();
    res.status(200).json(alerts);
  } catch (err) {
    next(new VError(err, "Failed to get the alert"));
  }
}

/**
 * Create an alert
 * @param {*} req 
 * @param {*} res 
 * @param {*} next **
 */
async function createAlert(req, res, next) {
  try {
    const payload = req.body;
    const Alert = new AlertModel(payload);

    const newAlert = await Alert.save();

    return res.status(200).json(newAlert);
  } catch (err) {
    next(new VError(err, "Failed to create alert"));
  }
}

module.exports = {
  getAlert,
  createAlert
};
