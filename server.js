'use strict';
var restify = require('restify');
var  fs = require('fs');
var jwt = require('jsonwebtoken');
global.oracledb = require('oracledb');

global.FUNCTIONS = require('./app/functions');

/**
 * Multilanguage configuration
 */
const languageSlug = 'en';
let languageFile = require('./local/'+languageSlug+'/display_messages.js');
global.LANGTEXT = languageFile.API_MESSAGES;


/** Set global varibale for controller and models */
require('dotenv').config();
global.env = process.env;

/***************Oracle configuratrion********************/
var configDB = require('./config/database.js');

global.tokenScret = configDB.jwtScret;
/****define oracle connection attributes***/
let connAtr;
global.connAttrs ={
	"user":configDB.username,
	"password":configDB.dbpassword,
	"connectString":configDB.connectionString,
	"poolIncrement":1,
	"poolMax":250,
	"poolMin":0,
    //"poolPingInterval":60,  
    //"poolTimeout":60
};
oracledb.createPool(connAttrs, function(err,results) {
  if (err) {
    console.log("Pool error==",err);
    return;
  }else
  {
	 console.log("Created pool connection");
  }
}); 
/**
* setup route middlewares
*/
var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'
fs.readdirSync(controllers_path).forEach(function (file)
 {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

 var server = restify.createServer();
 
server
    .use(restify.plugins.fullResponse())
    .use(restify.plugins.bodyParser({ requestBodyOnGet: true}))

  /**check header data**/
 server.use(function (req, res, next) 
{	

//console.log(req.headers);
let headerData = req.headers;
let loginToken = headerData.token;

	if(loginToken != undefined )
	{
		jwt.verify(loginToken,tokenScret, function(err, decoded) 
		{
			if(err)
			{
					res.status(400);
					res.json({
						error: true,
						 message:LANGTEXT.INVALIDTOKEN,
					});
					
			}
			else
			{
				next();
			}
		});
	}
	else
	{
			next();
	}

    //console.log(req.session.user);
    //res.status(404).render('errors/404.html', {title: "Sorry, page not found"});
});

/**
* add path to route
*/
require('./config/routes.js')(server,controllers); // load our routes and pass in our app 

var port = process.env.PORT || 3000;
server.listen(port,'10.30.8.231',function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})


if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })
