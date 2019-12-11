'use strict';

const Joi = require('@hapi/joi');

require('dotenv').config();

const configSchema = Joi.object({
	PORT: Joi.number().required(),
	MONGO_URI: Joi.string().required(),
	CLIENT_ID: Joi.string().required(),
	CLIENT_SECRET: Joi.string().required(),
	REDIRECT_URL: Joi.string().required(),
	REFRESH_TOKEN: Joi.string().required()
});

const config = {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	REDIRECT_URL: process.env.REDIRECT_URL,
	REFRESH_TOKEN: process.env.REFRESH_TOKEN
};

const result = configSchema.validate(config, { abortEarly: false });
if (result.error) {
	console.log(result.error);
	process.exit(1);
}

module.exports = result.value;
