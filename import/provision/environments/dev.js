var dev = {
	"code": "DEV",
	"domain": "soajs.org",
	"sitePrefix": "petstore",
	"apiPrefix": "petstore-api",
	"port": 81,
	"profile": "/opt/soajs/FILES/profiles/profile.js",
	"description": "this is the DEV environment",
	"dbs": {
		"clusters": {
			"dev_cluster": {}
		},
		"config": {
			"session": {
				"cluster": "dev_cluster",
				"name": "core_session",
				"store": {},
				"collection": "sessions",
				"stringify": false,
				"expireAfter": 1209600000
			}
		},
		"databases": {
			"urac": {
				"cluster": "dev_cluster",
				"tenantSpecific": true
			},
			"petStore": {
				"cluster": "dev_cluster",
				"tenantSpecific": false
			},
			"orders": {
				"cluster": "dev_cluster",
				"tenantSpecific": false
			}
		}
	}
};

module.exports = dev;