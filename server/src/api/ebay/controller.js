"use strict";

const VError = require("verror");
const fetch = require('node-fetch');

const EBAY_URL =
  "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=PatrickP-RankMyAp-PRD-33882c1d0-3c03000f&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD";

/**
 * Get Ebay products by keywords
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getEbayProductByKeyword(req, res, next) {
  try {
    const ebayURL = `${EBAY_URL}&keywords=${req.query.search}`;
    const response = await fetch(ebayURL);
    const jsonResponse = await response.json();
    const products = jsonResponse.findItemsByKeywordsResponse[0].searchResult[0].item;
    res.status(200).json(products);
  } catch (err) {
    next(new VError(err, "Failed to get the products"));
  }
}

module.exports = {
  getEbayProductByKeyword
};
