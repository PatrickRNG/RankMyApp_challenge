'use strict';

const VError = require('verror');

const Email = require('../../infra/email');

/**
 * Send an E-mail
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function sendEmail(req, res, next) {
	try {
		const email = new Email('challengerankmyapp@gmail.com');
		const transport = email.configEmail();
		const { from, to, subject, text } = req.body;
		const mailOptions = {
			from, // Sender address
			to, // List of recipients
			subject, // Subject line
			text // Plain text body
		};

		transport.sendMail(mailOptions, function(err, response) {
			err ? console.log(err) : console.log(response);
			transport.close();
		});

		res.status(200).end();
	} catch (err) {
		next(new VError(err, 'Failed to send the E-mail'));
	}
}

module.exports = {
	sendEmail
};
