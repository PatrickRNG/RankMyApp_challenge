'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const VError = require('verror');

const HttpServer = require('./http-server'); 
const config = require('./config');
const { errorHandler, loggingHandler } = require('../middleware/handler');
const routes = require('../routes/index');

class Express {

  constructor() {
    this.app = express;
    this.port = config.PORT;
  }

  /**
   * Initialize express server
   */
  async init() {
    this.app = express();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    
    this.app.use(loggingHandler);
    this.app.use(routes);
    this.app.use(errorHandler);
    
    await this.registerHttpServer();
  }

  /**
   * Register the http server
   */
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