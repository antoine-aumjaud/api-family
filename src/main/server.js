"use strict";

const APP_NAME = "api-family";
const APP_VERSION = "1.0.0";

const config = require('./conf/api-family.json');
const dataService = require('./data-service.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express()

/*
 * SECURITY
 */
const requireAuthentication = (req, res, next) => {    
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
.get('/hi',   (req, res) => res.send("hello"))
.get('/info', (req, res) => {
    res.json( { "name": APP_NAME, "version": APP_VERSION } );
})

.all('/secure/*', requireAuthentication)

.use(bodyParser.json())

.post('/secure/size', (req, res) => {
    res.status(addData('size', req.body) ? 200 : 500).end();
})
.post('/secure/weight', (req, res) => {
    res.status(addData('weight', req.body) ? 200 : 500).end();
})  
.post('/secure/shoes-size', (req, res) => {
    res.status(addData('shoes-size', req.body) ? 200 : 500).end();
})
.get('/secure/get/all', (req, res) => {
    res.json(dataService.get());
})
.get('/secure/get/:username', (req, res) => {
    const userData = dataService.get()[req.params.username];
    if(userData) { 
        res.json(userData); 
        return; 
    }
    res.status(404).end();
})
.get('/secure/get/:username/:type', (req, res) => {
    const userData = dataService.get()[req.params.username];
    if(userData) {
        const typeData = userData[req.params.type];
        if(typeData) {
            res.json(typeData);
            return;
        }
    }
    res.status(404).end();
})

.listen(9080);
console.log('Familly-API started on server 9080');

/*
 * PRIVATE
 */
const addData = (type, message) => {
    //prepare message
    const firstname = message.firstname;
    delete message.firstname;
    message.date = Date.now();
    //call service
    return dataService.add(firstname, type, message);
} 