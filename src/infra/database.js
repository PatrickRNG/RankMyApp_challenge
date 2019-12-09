'use strict';

const VError = require('verror');
const EventEmitter = require('events');
const mongoose = require('mongoose');

/**
 * @class Database
 * @extends {EventEmitter}
 */
class Database extends EventEmitter {
  
   /**
   * Creates an instance of MongoClient.
   * @param {string} mongoURI
   * @param {Mongoose.ConnectionOptions} mongoOpts
   * @memberof Database
   */
  constructor(mongoURI, mongoOpts = {}) {
    super();
    
    this.uri = mongoURI;
    this.options = mongoOpts;  
    this.connection = mongoose.connection;  
  }

  /**
   * Post initialization method
   * @memberof Database
   */
  async init() {
    try {
      this.createListeners();
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        ...this.options 
      });
    } catch (err) {
      throw new VError(err, 'Failed to initialize the connection with MongoDB');
    }
  }

  /**
   * Listen to connection events
   * @memberof Database
   */
  createListeners() {
    this.connection.on('all', () => {
      this.emit('info', 'MongoDB successfully connected to all replicas');
    });
    this.connection.on('fullsetup', () => {
      this.emit('info', 'MongoDB successfully connected to the primary and at least one secondary replica');
    });
    this.connection.on('reconnected', () => {
      this.emit('info', 'MongoDB has reconnected');
    });
    this.connection.on('connected', () => {
      this.emit('info', 'MongoDB is connected');
    });
    this.connection.on('disconnected', () => {
      this.emit('warn', new VError('MongoDB has suffered a disconnection'));
    });
    this.connection.on('error', (err) => {
      console.log('testtt error');
      this.emit('error', new VError(err, 'An error ocurred in the MongoDB connection'));
    });
  }

}

module.exports = Database;