'use strict';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const VError = require('verror');

const config = require('./config');

class Email {
	constructor(userEmail) {
		this.userEmail = userEmail;
		this.clientId = config.CLIENT_ID;
		this.clientSecret = config.CLIENT_SECRET;
		this.redirectURL = config.REDIRECT_URL;
		this.refreshToken = config.REFRESH_TOKEN;
	}

	/**
   * Configure nodemailer with smtp
   */
	configEmail() {
		try {
			const OAuth2 = google.auth.OAuth2;

			const oauth2Client = new OAuth2(
				this.clientId,
				this.clientSecret,
				this.redirectURL
			);

			oauth2Client.setCredentials({
				refresh_token: this.refreshToken
			});

			const accessToken = oauth2Client.getAccessToken();
			const transport = this.creteSmtpTransport(accessToken);
			return transport;
		} catch (err) {
			throw new VError(err, 'Failed to configure the E-mail');
		}
	}

	creteSmtpTransport(accessToken) {
		try {
			return nodemailer.createTransport({
				service: 'gmail',
				auth: {
					type: 'OAuth2',
					user: this.userEmail,
					clientId: this.clientId,
					clientSecret: this.clientSecret,
					refreshToken: this.refreshToken,
					accessToken
				}
			});
		} catch(err) {
			throw new VError(err, 'Failed to configure smtp');
		}
	}
}

module.exports = Email;
