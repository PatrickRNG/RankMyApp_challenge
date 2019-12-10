const API_URL = 'http://localhost:3000';
const ALERT_URL = `${API_URL}/alerts`;
/**
 * GET alerts
 */
async function getAlerts() {
  const alerts = await fetch(ALERT_URL);
  return alerts.json();
}

/**
 * POST create an alert
 * @param {*} payload 
 */
async function createAlert(payload) {
  const newAlert = await fetch(ALERT_URL, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
  return newAlert.json();
}

async function getEbayProductByKeyword(keyword) {
  const ebayURL = `${API_URL}/products?search=${keyword}`;
  const products = await fetch(ebayURL);
  return products;
}

export {getAlerts, createAlert, getEbayProductByKeyword};