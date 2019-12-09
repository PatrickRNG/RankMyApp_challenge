'use strict';

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const alertSchema = new mongoose.Schema({
  search: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const AlertModel = mongoose.model('alert', alertSchema);

module.exports = AlertModel;