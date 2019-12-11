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
    const alerts = await AlertModel.find({}, {__v: 0 }).exec();
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

/**
 * Get all alerts
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteAlert(req, res, next) {
  try {
    AlertModel.deleteOne({_id: req.body.id}).exec();
    res.status(200).end();
  } catch (err) {
    next(new VError(err, "Failed to get the alert"));
  }
}

module.exports = {
  getAlert,
  createAlert,
  deleteAlert
};
