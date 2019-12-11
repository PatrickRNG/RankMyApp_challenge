const API_URL = "http://localhost:3000";
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
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
  return newAlert.json();
}

/**
 * DELETE alert
 */
async function deleteAlert(id) {
  fetch(ALERT_URL, {
    method: "delete",
    body: JSON.stringify(id),
    headers: { "Content-Type": "application/json" }
  });
}

/**
 * GET Ebay products by keyword
 * @param {*} keyword 
 */
async function getEbayProductByKeyword(keyword) {
  const ebayURL = `${API_URL}/products?search=${keyword}`;
  const products = await fetch(ebayURL);
  return products.json();
}

/**
 * GET Send aE-mail
 * @param {*} payload 
 */
function sendEmail(payload) {
  const emailURL = `${API_URL}/email`;
  fetch(emailURL, {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  });
}

export {
  getAlerts,
  createAlert,
  deleteAlert,
  getEbayProductByKeyword,
  sendEmail
};
