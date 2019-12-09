'use strict';

const Joi = require('@hapi/joi');

require('dotenv').config();

const configSchema = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required()
});

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI
};

const result = configSchema.validate(config, { abortEarly: false });
if (result.error) {
  console.log(result.error);
  process.exit(1);
}

module.exports = result.value;
