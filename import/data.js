var soajs = require("soajs");
var async = require("async");
var util = require("soajs.core.libs").utils;
var mongo = new soajs.mongo(dbconfig);
var dbConfClone = util.cloneObj(dbconfig);
dbConfClone.name = "petStore";
var mongoPetStore = new soajs.mongo(dbConfClone);
var keySecurity = "";

function generateExternalKey(opts, cb) {
	var module = require("soajs").core.key;
	var key = opts.key;
	
	var tenant = {
		id: opts.tenantId
	};
	var application = {
		"package": opts.package
	};
	var config = {
		algorithm: opts.secret.algorithm,
		password: opts.secret.password
	};
	
	module.generateExternalKey(key, tenant, application, config, function (error, extKey) {
		if (error) {
			return cb(error);
		}
		
		module.getInfo(extKey, config, function (error, response) {
			if (error) {
				return cb(error);
			}
			if (response.key === key) {
				return cb(null, extKey);
			}
			else {
				return cb(new Error("Generated Key is invalid."));
			}
		});
	});
}

function cloneEnvironment(cb) {
	
	mongo.findOne("environment", {"code": "DASHBOARD"}, function (error, dashboardRecord) {
		if (error) {
			return cb(error);
		}
		var env = require('./provision/environments/dev.js');
		env._id = mongo.ObjectId();
		env.deployer = dashboardRecord.deployer;
		env.dbs.config = dashboardRecord.dbs.config;
		env.dbs.session.name = "dev_" + dashboardRecord.dbs.session.name;
		env.dbs.databases.urac = dashboardRecord.dbs.databases.urac;
		env.services = dashboardRecord.services;
		keySecurity = dashboardRecord.services.config.key;
		
		mongo.remove("environment", {"code": "DEV"}, function (error) {
			if (error) {
				return cb(error);
			}
			mongo.insert("environment", env, {upsert: true, multi: false, safe: true}, function (error, result) {
				if (error) {
					return cb(error);
				}
				console.log("Dev environment added");
				return cb();
			});
		});
	});
}

function addProducts(cb) {
	var products = require('./provision/products/');
	if (products._id) {
		products._id = new mongo.ObjectId(products._id);
	}
	
	mongo.remove("products", {"code": "STORE"}, function (error) {
		if (error) {
			return cb(error);
		}
		
		mongo.insert("products", products, function (err, results) {
			if (err) {
				return cb(err);
			}
			
			return cb();
		});
	});
}

function addTenants(cb) {
	var tenants = require('./provision/tenants/');
	
	tenants.forEach(function (tenant) {
		tenant._id = mongo.ObjectId(tenant._id);
		tenant.applications.forEach(function (oneApp) {
			oneApp.appId = new mongo.ObjectId(oneApp.appId.toString());
			
			storeTenants();
		});
	});
	
	function storeTenants() {
		var tenantsList = ["PEST"];
		mongo.remove("tenants", {"code": {"$in": tenantsList}}, function (error) {
			if (error) {
				return cb(error);
			}
			
			mongo.insert("tenants", tenants, {upsert: true, multi: true, safe: true}, function (err) {
				if (err) {
					return cb(err);
				}
				else {
				}
				return cb();
			});
		});
	}
}

function modifyDashboardDefaults(cb) {
	mongo.findOne("environment", {"code": "PORTAL"}, function (error, portalRecord) {
		if (error) {
			return cb(error);
		}
		mongo.findOne("products", {"code": "PRTAL"}, function (error, prtalProduct) {
			if (error) {
				return cb(error);
			}
			
			prtalProduct.packages.forEach(function (onePackage) {
				if (onePackage.code === "PRTAL_USER") {
					if (!onePackage.acl.dev) {
						onePackage.acl.dev = {};
					}
					
					onePackage.acl.dev.orders = {
						"apisPermission": "restricted",
						"access": true,
						"post": {
							"apis": {
								"/order/:id": {"access": true}
							}
						},
						"delete": {
							"apis": {
								"/order/:id": {"access": true}
							}
						},
						"get": {
							"apis": {
								"/admin/orders": {"access": true}
							}
						}
					};
					onePackage.acl.dev.petstore = {
						"access": true,
						"get": {
							"apis": {}
						},
						"post": {
							"apis": {}
						},
						"delete": {
							"apis": {}
						}
					};
					
					onePackage.acl.dev.urac = {
						"access": true,
						"apisPermission": "restricted",
						"get": {
							"apis": {
								"/owner/admin/users/count": {"access": false},
								"/owner/admin/listUsers": {"access": false},
								"/owner/admin/changeUserStatus": {"access": false},
								"/owner/admin/getUser": {"access": false},
								"/owner/admin/group/list": {"access": false},
								"/owner/admin/tokens/list": {"access": false}
							}
						},
						"post": {
							"apis": {
								"/owner/admin/addUser": {"access": false},
								"/owner/admin/editUser": {"access": false},
								"/owner/admin/editUserConfig": {"access": false},
								"/owner/admin/group/add": {"access": false},
								"/owner/admin/group/edit": {"access": false},
								"/owner/admin/group/addUsers": {"access": false}
							}
						},
						"delete": {
							"apis": {
								"/owner/admin/group/delete": {"access": false},
								"/owner/admin/tokens/delete": {"access": false}
							}
						}
					};
				}
			});
			
			mongo.save("products", prtalProduct, function (error) {
				if (error) {
					return cb(error);
				}
				
				mongo.findOne("tenants", {"code": "PRTL"}, function (error, prtlTenant) {
					if (error) {
						return cb(error);
					}
					
					prtlTenant.applications.forEach(function (oneApplication) {
						if (oneApplication.package == "PRTAL_USER") {
							oneApplication.keys.forEach(function (oneKey) {
								if (!oneKey.config.dev) {
									oneKey.config.dev = {};
									oneKey.config.dev.commonFields = {
										"mail": {
											"from": "me@localhost.com",
											"transport": {
												"type": "sendmail",
												"options": {}
											}
										}
									};
									oneKey.config.dev.orders = {
										"mail": {
											"confirm": {
												"subject": "Order Confirmation",
												"path": "/opt/soajs/node_modules/soajs.petstore.order/templates/confirmEmail.tmpl"
											},
											"reject": {
												"subject": "Order Rejected",
												"path": "/opt/soajs/node_modules/soajs.petstore.order/templates/rejectEmail.tmpl"
											}
										}
									};
								}
								generateExternalKey({
									key: oneKey.key,
									tenantId: prtlTenant._id.toString(),
									package: oneApplication.package,
									secret: keySecurity
								}, function (error, externalKey) {
									if (error) {
										return cb(error);
									}
									
									for (var i = oneKey.extKeys.length - 1; i >= 0; i--) {
										if (oneKey.extKeys[i].env === 'DEV') {
											oneKey.extKeys.splice(i, 1);
										}
									}
									
									oneKey.extKeys.push({
										"extKey": externalKey,
										"device": {},
										"geo": {},
										"env": "DEV",
										"dashboardAccess": true
									});
									storeTenant(prtlTenant);
								});
							});
						}
					});
				});
			});
		});
	});
	
	function storeTenant(prtlTenant) {
		mongo.save("tenants", prtlTenant, cb);
	}
}

function addCatalogs(cb) {
	var catalogs = require('./provision/catalogs/');
	
	catalogs.forEach(function (catalog) {
		catalog._id = mongo.ObjectId(catalog._id);
	});
	
	mongo.remove("catalogs", {"name": "Dev Nginx Recipe"}, function (error) {
		if (error) {
			return cb(error);
		}
		mongo.remove("catalogs", {"name": "Dev Service Recipe"}, function (error) {
			if (error) {
				return cb(error);
			}
			mongo.insert("catalogs", catalogs, function (err, results) {
				if (err) {
					return cb(err);
				}
				
				return cb();
			});
		});
	});
}

function addPetStore(cb) {
	var pets = require('./provision/petStore/');
	
	pets.forEach(function (pet) {
		pet._id = mongo.ObjectId(pet._id);
	});
	
	mongoPetStore.remove("pets", {}, function (error) {
		if (error) {
			return cb(error);
		}
		mongoPetStore.insert("pets", pets, function (err, results) {
			if (err) {
				return cb(err);
			}
			return cb();
		});
	});
}

async.series([cloneEnvironment, addProducts, addTenants, modifyDashboardDefaults, addCatalogs, addPetStore], function (error) {
	if (error) {
		throw error;
	}
	mongo.closeDb();
	mongoPetStore.closeDb();
	process.exit();
});
