'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const VError = require('verror');

const HttpServer = require('./http-server'); 
const config = require('./config');
const { errorHandler } = require('../middleware/handler');

class Express {

  constructor() {
    this.app = express;
    this.port = config.PORT;
  }

  async init() {
    this.app = express();
    this.app.use(helmet());
    // Allow json parser on body
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.app.use(errorHandler);
    
    await this.registerHttpServer();
  }

  async registerHttpServer() {
    this.httpServer = new HttpServer(this.app, this.port);
    this.httpServer.on('error', err => {
      return new VError(err, 'Error to initialize the server');
    });
    this.httpServer.on('info', msg => {
      console.log(msg);
    });

    this.httpServer.init();
  }
}


module.exports = Express;