var dev = {
	"code": "DEV",
	"domain": "soajs.org",
	"sitePrefix": "petstore",
	"apiPrefix": "petstore-api",
	"port": 81,
	"protocol": "http",
	"profile": "/opt/soajs/FILES/profiles/profile.js",
	"description": "this is the DEV environment",
	"dbs": {
		"config": {
			"prefix": ""
		},
		"databases": {
			"urac": {
				"cluster": "dash_cluster",
				"tenantSpecific": true
			},
			"petStore": {
				"cluster": "dash_cluster",
				"tenantSpecific": false
			},
			"orders": {
				"cluster": "dash_cluster",
				"tenantSpecific": false
			}
		},
		"session": {
			"cluster": "dash_cluster",
			"name": "core_session",
			"store": {},
			"collection": "sessions",
			"stringify": false,
			"tenantSpecific": false,
			"expireAfter": 1209600000
		}
	}
};

module.exports = dev;