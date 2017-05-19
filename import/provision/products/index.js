'use strict';

var testProduct = {
	"_id": '5903651ef954ca02b916a904',
	"code": "STORE",
	"name": "petStore",
	"description": "this is the pet store product",
	"packages": [
		{
			"code": "STORE_PACK1",
			"name": "Package1",
			"description": null,
			"acl": {
				"dev": {
					"orders": {
						"apisPermission": "restricted",
						"access": false,
						"get": {
							"apis": {
								"/orders": {"access": true},
								"/mergeCart": {"access": true},
								"/cart": {"access": false}
							}
						},
						"delete": {
							"apis": {
								"/cart/:id": {"access": false},
							}
						},
						"post": {
							"apis": {
								"/cart": {"access": false},
								"/order/:id": {"access": true},
								"/cart/checkout/:id": {"access": true}
							}
						}
					},
					"petstore": {
						"apisPermission": "restricted",
						"access": false,
						"post": {
							"apis": {}
						},
						"get": {
							"apis": {
								"/pet/:id": {"access": false},
								"/pets": {"access": false},
							}
						},
						"delete": {
							"apis": {}
						},
						"put": {
							"apis": {}
						}
					},
					"urac": {
						"access": false,
						"apisPermission": "restricted",
						"get": {
							"apis": {
								"/account/getUser": {
									"access": true
								},
								"/passport/login/:strategy": {},
								"/passport/validate/:strategy": {},
								"/join/validate": {},
								"/forgotPassword": {},
								"/checkUsername": {},
								"/changeEmail/validate": {}
							}
						},
						"post": {
							"apis": {
								"/account/changePassword": {
									"access": true
								},
								"/account/changeEmail": {
									"access": true
								},
								"/account/editProfile": {
									"access": true
								},
								"/join": {},
								"/resetPassword": {}
							}
						},
						"delete": {
							"apis": {}
						}
					},
					"oauth": {
						"access": false,
						"apisPermission": "restricted",
						"get": {
							"apis": {
								"/authorization": {}
							}
						},
						"post": {
							"apis": {
								"/token": {}
							}
						},
						"delete": {
							"apis": {
								"/accessToken/:token": {
									"access": true
								},
								"/refreshToken/:token": {
									"access": true
								}
							}
						}
					}
				}
			},
			"_TTL": 21600000
		}
	]
};

module.exports = testProduct;