'use strict';

const Joi = require('@hapi/joi');

require('dotenv').config();

const configSchema = Joi.object({
  PORT: Joi.number().required()
});

const config = {
  PORT: process.env.PORT
};

const result = configSchema.validate(config, { abortEarly: false });
if (result.error) {
  console.log(result.error);
  process.exit(1);
}

module.exports = result.value;
