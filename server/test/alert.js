const fetch = require('node-fetch')
const chai = require('chai');
const expect = chai.expect;

describe('Alert API test', () => {

  const ALERT_API = 'http://localhost:3000/alerts';

  it('should return the alerts correctly', async () => {
      const response = await fetch(ALERT_API);
      const alerts = await response.json();
      expect(response.status).to.equal(200);
      expect(alerts).to.be.a('array');
  });

  it('should create an alert correctly', async () => {
    const newAlert = {
      search: 'test',
      email: 'test@test.com',
      time: 10
    };

    const response = await fetch(ALERT_API, {
      method: 'post',
      body: JSON.stringify(newAlert),
      headers: { 'Content-Type': 'application/json' }
    });

    const alert = await response.json();
    expect(response.status).to.equal(200);
    expect(alert).to.be.a('object');
  });
});