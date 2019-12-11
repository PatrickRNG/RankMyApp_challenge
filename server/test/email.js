/* eslint-disable no-undef */
const fetch = require('node-fetch');
const chai = require('chai');
const expect = chai.expect;

describe('Email API test', () => {
	const EMAIL_API = 'http://localhost:3000/email';

	it('should send an E-mail', async () => {
		const emailPayload = {
			from: 'challengerankmyapp@gmail.com',
			to: 'test@test.com',
			subject: 'Ebay Alert',
			text: 'Ebay test'
		};

		const response = await fetch(EMAIL_API, {
			method: 'post',
			body: JSON.stringify(emailPayload),
			headers: { 'Content-Type': 'application/json' }
		});
		expect(response.status).to.equal(200);
	});
});
