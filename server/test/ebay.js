const fetch = require('node-fetch')
const chai = require('chai');
const expect = chai.expect;

describe('Ebay API test', () => {

  const EBAY_API = 'http://localhost:3000/products';

  it('should return the ebay products correctly', async () => {
      const response = await fetch(EBAY_API);
      const products = await response.json();
      expect(response.status).to.equal(200);
      expect(products).to.be.a('array');
  });
});