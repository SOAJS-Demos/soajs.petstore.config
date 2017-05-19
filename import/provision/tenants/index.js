'use strict';

var test = [{
	"_id": '590365d1f954ca02b916a905',
	"type": "client",
	"code": "PEST",
	"name": "Pet Store tenant",
	"description": "This is the pet store tenant",
	"oauth": {
		"secret": "shhh this is a secret",
		"redirectURI": "",
		"grants": [
			"password",
			"refresh_token"
		]
	},
	"applications": [
		{
			"product": "STORE",
			"package": "STORE_PACK1",
			"appId": '5903661cf954ca02b916a906',
			"description": "This is the pet store package",
			"_TTL": 21600000,
			"keys": [
				{
					"key": "d8f94810a1e4b6a75e4326fcf9c5ee33",
					"extKeys": [
						{
							"extKey": "d1bd89aa561d537fa292e4500aa0a4ecab0ba4941440194642b1fe9a8e177786fe864ce680afb2bb4115162fcfe0dd99a3449147dfec273f0bcb6f77ce666d42cc48edd94d703e1f997e3466cb0238ee8c9c6ccc22b0d9dd2ef2108eef8b63a3",
							"device": {},
							"geo": {},
							"env": "DEV",
							"dashboardAccess": false,
							"expDate": null
						}
					],
					"config": {
						"dev": {
							"oauth": {
								"loginMode": "urac"
							},
							"urac": {
								"passportLogin": {
									"twitter": {
										"clientID": "99xh0yloelmPNlIH11Wv746TH",
										"clientSecret": "xx9llmf7dxP6UUTMY1GWZRRcCCDanAmd1EJupQ9HNraqzmWEMK",
										"callbackURL": "http://petstore.soajs.org:81/successPassport",
										"userProfileURL": "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"
									},
									"facebook": {
										"clientID": "290273094764998",
										"clientSecret": "a721d5b9e19b419f587381806a60a8d7",
										"callbackURL": "http://petstore.soajs.org:81/successPassport?mode=facebook"
									},
									"google": {
										"clientID": "1083679684817-tv85ljjlb1ron1jgntts075q7eagmasa.apps.googleusercontent.com",
										"clientSecret": "DbxYYdFB4kYVaRiIPSfKA0-G",
										"callbackURL": "http://petstore.soajs.org:81/successPassport"
									}
								},
								"mail": {
									"join": {
										"subject": "Welcome to SOAJS",
										"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/join.tmpl"
									},
									"forgotPassword": {
										"subject": "Reset Your Password at SOAJS",
										"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/forgotPassword.tmpl"
									},
									"addUser": {
										"subject": "Account Created at SOAJS",
										"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/addUser.tmpl"
									},
									"changeUserStatus": {
										"subject": "Account Status changed at SOAJS",
										"content": "<p>Dear <b>{{ username }}</b>, <br />The administrator update your account status to <b>{{ status }}</b> on {{ ts|date('F jS, Y') }}.<br /><br />Regards,<br/>SOAJS Team.</p>"
									},
									"changeEmail": {
										"subject": "Change Account Email at SOAJS",
										"path": "/opt/soajs/node_modules/soajs.urac/mail/urac/changeEmail.tmpl"
									}
								},
								"hashIterations": 1024,
								"seedLength": 32,
								"link": {
									"changeEmail": "http://petstore.soajs.org:81/changeEmailValidate",
									"forgotPassword": "http://petstore.soajs.org:81/resetPassword",
									"join": "http://petstore.soajs.org:81/joinValidate"
								},
								"tokenExpiryTTL": 172800000,
								"validateJoin": true
							},
							"mail": {
								"from": "soajstest@soajs.org",
								"transport": {
									"type": "smtp",
									"options": {
										"host": "secure.emailsrvr.com",
										"port": "587",
										"ignoreTLS": true,
										"secure": false,
										"auth": {
											"user": "soajstest@soajs.org",
											"pass": "p@ssw0rd"
										}
									}
								}
							}
						}
					}
				}
			]
		}
	]
}];

module.exports = test;