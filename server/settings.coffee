environment = process.env.NODE_ENV

devFacebook =
	appId: "419826284832955"
	secret: "31032eb691bb99c8db30ec8a5aa37c03"
prodFacebook =
	appId: "618928581566640"
	secret: "809f8d70b5b56fccc87e41e0654808d6"

console.log( environment)

ServiceConfiguration.configurations.remove
	service: "facebook"


if( environment == 'development' )
	ServiceConfiguration.configurations.insert
		service: "facebook"
		loginStyle: "popup"
		appId: devFacebook.appId
		secret: devFacebook.secret
else 
	ServiceConfiguration.configurations.insert
		service: "facebook"
		loginStyle: "popup"
		appId: prodFacebook.appId
		secret: prodFacebook.secret

