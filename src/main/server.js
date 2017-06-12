"use strict";

const APP_NAME = "api-family";
const APP_VERSION = "1.0.0";

const config = require('./conf/api-family.json');
const data = require('./data-service.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express()

/*
 * SECURITY
 */
const requireAuthentication = function (req, res, next) {    
    if(req.header("secure-key") && req.header("secure-key") === config.secureKey) {
        next();
    }
    else {
        res.status(401).send('Not authorized');
    }
};

/*
 * ROUTES
 */
app
.get('/hi', (req, res) => res.send("hello"))
.get('/info', (req, res) => {
    res.json( { "name": APP_NAME, "version": APP_VERSION } );
})

.all('/secure/*', requireAuthentication)

.use(bodyParser.json())

.post('/secure/size', (req, res) => {
    res.status(data.add('size', req.body) ? 200 : 500).end();
})
.post('/secure/weight', (req, res) => {
    res.status(data.add('weight', req.body) ? 200 : 500).end();
})  
.post('/secure/shoes-size', (req, res) => {
    res.status(data.add('shoes-size', req.body) ? 200 : 500).end();
})

.listen(9080);
console.log('Familly-API started on server 9080');


