const express = require('express');
//http security headers
const helmet         = require('helmet'); 
//only use lowercase paths
var lowercasePaths   = require('express-lowercase-paths');
//Cookie handler middleware
var cookieParser     = require('cookie-parser'); //OUTDATED?

function loadDefaultMiddlewares(app) {
    //Set http security headers
    app.use(helmet());
    //For parsing application/json
    app.use(express.json());
    //change all uppercase letters in a path to lowercase 
    //preserves uppercase in url queries, but NOT in url params
    app.use(lowercasePaths());
    //Handle cookies
    //app.use(cookieParser());  //Uncomment this if there are cookie erros
}

module.exports = loadDefaultMiddlewares;
