'use strict';

var dev = [{
	"_id": '5919bf91645d410044f137a1',
	"name": "Dev Nginx Recipe",
	"type": "nginx",
	"description": "This is the nginx catalog recipe used to deploy the nginx in the dashboard environment.",
	"recipe": {
		"deployOptions": {
			"image": {
				"prefix": "soajsorg",
				"name": "nginx",
				"tag": "latest",
				"pullPolicy": "Always"
			},
			"readinessProbe": {
				"httpGet": {
					"path": "/",
					"port": "http"
				},
				"initialDelaySeconds": 5,
				"timeoutSeconds": 2,
				"periodSeconds": 5,
				"successThreshold": 1,
				"failureThreshold": 3
			},
			"restartPolicy": {
				"condition": "",
				"maxAttempts": 0
			},
			"container": {
				"network": "",
				"workingDir": ""
			},
			"voluming": {
				"volumes": [
					{
						"Type": "volume",
						"Source": "soajs_log_volume",
						"Target": "/var/log/soajs/"
					}
				]
			},
			"ports": [
				{
					"name": "http",
					"target": 80,
					"isPublished": true,
					"published": 81
				},
				{
					"name": "https",
					"target": 443,
					"isPublished": true,
					"published": 444
				}
			]
		},
		"buildOptions": {
			"env": {
				"SOAJS_ENV": {
					"type": "computed",
					"value": "$SOAJS_ENV"
				},
				"SOAJS_NX_DOMAIN": {
					"type": "computed",
					"value": "$SOAJS_NX_DOMAIN"
				},
				"SOAJS_NX_API_DOMAIN": {
					"type": "computed",
					"value": "$SOAJS_NX_API_DOMAIN"
				},
				"SOAJS_PETSTORE_DOMAIN": {
					"type": "computed",
					"value": "$SOAJS_NX_SITE_DOMAIN"
				},
				"SOAJS_NX_CONTROLLER_NB": {
					"type": "computed",
					"value": "$SOAJS_NX_CONTROLLER_NB"
				},
				"SOAJS_NX_CONTROLLER_IP": {
					"type": "computed",
					"value": "$SOAJS_NX_CONTROLLER_IP_N"
				},
				"SOAJS_NX_CONTROLLER_PORT": {
					"type": "computed",
					"value": "$SOAJS_NX_CONTROLLER_PORT"
				},
				"SOAJS_DEPLOY_HA": {
					"type": "computed",
					"value": "$SOAJS_DEPLOY_HA"
				},
				"SOAJS_HA_NAME": {
					"type": "computed",
					"value": "$SOAJS_HA_NAME"
				},
				"SOAJS_GIT_DASHBOARD_BRANCH": {
					"type": "static",
					"value": "master"
				},
				"SOAJS_GIT_REPO": {
					"type": "userInput",
					"default": "soajs.petstore.ui",
					"label": "Git Repo"
				},
				"SOAJS_GIT_OWNER": {
					"type": "userInput",
					"default": "SOAJS-Demos",
					"label": "Git Repo"
				},
				"SOAJS_GIT_BRANCH": {
					"type": "userInput",
					"default": "demo",
					"label": "Git Branch"
				},
				"SOAJS_GIT_PATH": {
					"type": "userInput",
					"default": "/widget",
					"label": "Git Path"
				},
				"SOAJS_CONFIG_REPO_PROVIDER": {
					"type": "static",
					"value": "github"
				},
				"SOAJS_CONFIG_REPO_DOMAIN": {
					"type": "static",
					"value": "github.com"
				},
				"SOAJS_CONFIG_REPO_OWNER": {
					"type": "static",
					"value": "SOAJS-Demos"
				},
				"SOAJS_CONFIG_REPO_BRANCH": {
					"type": "static",
					"value": "demo"
				},
				"SOAJS_CONFIG_REPO_NAME": {
					"type": "static",
					"value": "soajs.petstore.config"
				}
			},
			"cmd": {
				"deploy": {
					"command": [
						"bash",
						"-c"
					],
					"args": [
						"node index.js -T nginx"
					]
				}
			}
		}
	}
}, {
	"_id": '5919bf45645d410044f137a0',
	"name": "Dev Service Recipe",
	"type": "soajs",
	"subtype": "service",
	"description": "This is the service catalog recipe used to deploy the core services in the dashboard environment.",
	"recipe": {
		"deployOptions": {
			"image": {
				"prefix": "soajsorg",
				"name": "soajs",
				"tag": "latest",
				"pullPolicy": "Always"
			},
			"specifyGitConfiguration": true,
			"readinessProbe": {
				"httpGet": {
					"path": "/heartbeat",
					"port": "maintenance"
				},
				"initialDelaySeconds": 5,
				"timeoutSeconds": 2,
				"periodSeconds": 5,
				"successThreshold": 1,
				"failureThreshold": 3
			},
			"restartPolicy": {
				"condition": "",
				"maxAttempts": 0
			},
			"container": {
				"network": "",
				"workingDir": ""
			},
			"voluming": {
				"volumes": [
					{
						"Type": "volume",
						"Source": "soajs_log_volume",
						"Target": "/var/log/soajs/"
					}
				]
			}
		},
		"buildOptions": {
			"settings": {
				"accelerateDeployment": true
			},
			"env": {
				"NODE_ENV": {
					"type": "static",
					"value": "production"
				},
				"SOAJS_ENV": {
					"type": "computed",
					"value": "$SOAJS_ENV"
				},
				"SOAJS_PROFILE": {
					"type": "static",
					"value": "/opt/soajs/FILES/profiles/profile.js"
				},
				"SOAJS_SRV_AUTOREGISTERHOST": {
					"type": "static",
					"value": "true"
				},
				"SOAJS_SRV_MEMORY": {
					"type": "computed",
					"value": "$SOAJS_SRV_MEMORY"
				},
				"SOAJS_GC_NAME": {
					"type": "computed",
					"value": "$SOAJS_GC_NAME"
				},
				"SOAJS_GC_VERSION": {
					"type": "computed",
					"value": "$SOAJS_GC_VERSION"
				},
				"SOAJS_GIT_OWNER": {
					"type": "computed",
					"value": "$SOAJS_GIT_OWNER"
				},
				"SOAJS_GIT_BRANCH": {
					"type": "computed",
					"value": "$SOAJS_GIT_BRANCH"
				},
				"SOAJS_GIT_COMMIT": {
					"type": "computed",
					"value": "$SOAJS_GIT_COMMIT"
				},
				"SOAJS_GIT_REPO": {
					"type": "computed",
					"value": "$SOAJS_GIT_REPO"
				},
				"SOAJS_GIT_TOKEN": {
					"type": "computed",
					"value": "$SOAJS_GIT_TOKEN"
				},
				"SOAJS_DEPLOY_HA": {
					"type": "computed",
					"value": "$SOAJS_DEPLOY_HA"
				},
				"SOAJS_HA_NAME": {
					"type": "computed",
					"value": "$SOAJS_HA_NAME"
				},
				"SOAJS_MONGO_NB": {
					"type": "computed",
					"value": "$SOAJS_MONGO_NB"
				},
				"SOAJS_MONGO_PREFIX": {
					"type": "computed",
					"value": "$SOAJS_MONGO_PREFIX"
				},
				"SOAJS_MONGO_RSNAME": {
					"type": "computed",
					"value": "$SOAJS_MONGO_RSNAME"
				},
				"SOAJS_MONGO_AUTH_DB": {
					"type": "computed",
					"value": "$SOAJS_MONGO_AUTH_DB"
				},
				"SOAJS_MONGO_SSL": {
					"type": "computed",
					"value": "$SOAJS_MONGO_SSL"
				},
				"SOAJS_MONGO_IP": {
					"type": "computed",
					"value": "$SOAJS_MONGO_IP_N"
				},
				"SOAJS_MONGO_PORT": {
					"type": "computed",
					"value": "$SOAJS_MONGO_PORT_N"
				},
				"SOAJS_DEPLOY_ACC": {
					"type": "static",
					"value": "true"
				},
				"SOAJS_SRV_MAIN": {
					"type": "computed",
					"value": "$SOAJS_SRV_MAIN"
				}
			},
			"cmd": {
				"deploy": {
					"command": [
						"bash",
						"-c"
					],
					"args": [
						"node index.js -T service"
					]
				}
			}
		}
	}
}];

module.exports = dev;