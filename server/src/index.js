/*
  ExpressJS Server initialization file
*/

//Imports
const express = require('express');
const helmet = require('helmet'); //http security headers
var cors = require('cors') //Allow CORS
var logger = require('morgan'); //logging middleware
require('dotenv').config(); //Load the .env config file
//Router imports
const APIrouter = require("./routes/APIrouter.js"); // DEPRECATED OLD --TODO: DELETE
const topRouter = require("./routes/topRouter.js");
const userRouter = require("./routes/userRouter.js");
const entryRouter = require("./routes/entryRouter.js");

// =================================================================

// SERVER SETUP AND CONFIG

//Set base url
var BASE_URL = process.env.BASE_URL || "http://localhost";

//Set cors headers and config
var corsOptions = {
  origin: "http://localhost:3000"
};

//Information about routes / routers
const routingTable = [
  //{route: '/api', name: APIrouter},
  //{route: '/api', name: topRouter},
  {route: '/api/user', name: userRouter},
  {route: '/api/user/entry', name: entryRouter}
];

//Initialize expressJS
const app = express();
//Initialize express router
const router = express.Router();

//You can set the environment variable PORT to tell your web server what port to listen on.
//Initialize the port with the bash command: PORT=YourPortNumberHere node index.js 
//for example PORT=4555 node index.js  
//If no port is set e.g. node index.js then port 3000 will be used by default
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//You can set the environment variable NODE_ENV to either "production" or "development". 
//It defaults to "development" if its not set.
var MODE = process.env.NODE_ENV || "development";

//Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Give a warning when port is 3000 (default port)
// Some hosting services like Amazon return an error when port is 3000 
function defaultPortWarning() {
	if (port === 3000) {
		return `Warning: The set port is the default port: ${port}. This may cause errors in non-local deployments.`  
	}
	return "Success: The set port is not the default port.";
}

// =================================================================

// MIDDLEWARES

//Enable All CORS Requests
app.use(cors(corsOptions));
//app.use(cors());
//Set http security headers
app.use(helmet());
//Enable logging middleware based on mode
if (MODE === "development") {
  app.use(logger('dev'));
} 
else if (MODE === "production") {
  app.use(logger('common'));
}
//For parsing application/json
app.use(express.json());
//Mount all the routers. See routing table for info.
for (let i = 0; i < routingTable.length; i++)
{
  app.use(routingTable[i].route, routingTable[i].name);
}

//Basic server response test
app.get('/test', async (req, res, next) => {
  console.log("Received test.");
  try
  {
      return res.status(201).send("Test success");
  }
  catch (error)
  {
      console.log("Test failed.");
      console.log("500: Internal server error - " + error.message);
      res.status(500).send(error.message);
  }
});

// =================================================================

//Start server
app.listen(port, () => {
    console.log("============");
    console.log(`Starting server...`);
    console.log(`${defaultPortWarning()}`);
    console.log(`ExpressJS server started...`);
    console.log(`Mode: ${MODE}`);
    console.log(`Listening on "${BASE_URL}:${port}"...`);
    console.log("------------"); 
    console.log(`Use CTRL+C to stop the server...`);
  });

module.exports = router;

