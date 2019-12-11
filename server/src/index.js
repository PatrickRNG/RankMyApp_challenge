'use strict';

const Express = require('./infra/express');
const Database = require('./infra/database');

const config = require('./infra/config');

const express = new Express();
const mongoOpts = {
	useCreateIndex: true,
	useUnifiedTopology: true
};
const database = new Database(config.MONGO_URI, mongoOpts);

database.init();
database.on('info', msg => console.log(msg));
database.on('error', msg => console.log(msg));
express.init();