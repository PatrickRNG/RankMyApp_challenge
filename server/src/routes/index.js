'use strict';

const { Router } = require('express');

const alertController = require('../api/alert/controller');
const ebayController = require('../api/ebay/controller');
const emailController = require('../api/email/controller');

const router = Router();

router.get('/alerts', alertController.getAlert);
router.post('/alerts', alertController.createAlert);
router.delete('/alerts', alertController.deleteAlert);
router.get('/products', ebayController.getEbayProductByKeyword);
router.post('/email', emailController.sendEmail);

module.exports = router;