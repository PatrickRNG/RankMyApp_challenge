'use strict';

const { Router } = require('express');
const VError = require('verror');

const alertController = require('../api/alert/controller');

const router = Router();

router.get('/alerts', alertController.getAlert);
router.post('/alerts', alertController.createAlert);

module.exports = router;