'use strict';

const { Router } = require('express');

const alertController = require('../api/alert/controller');
const ebayController = require('../api/ebay/controller');

const router = Router();

router.get('/alerts', alertController.getAlert);
router.post('/alerts', alertController.createAlert);
router.get('/products', ebayController.getEbayProductByKeyword);

module.exports = router;