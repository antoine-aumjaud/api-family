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
    if(req.header("secure-key") === config.secureKey
    || req.query["secure-key"] === config.secureKey) {
        next();
    }
    else {
        console.log("SECURITY: error on access to this resource")
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

//Category API
.post('/secure/size', (req, res) => {
    res.status(addData('size', req.body) ? 200 : 500).end();
})
.post('/secure/weight', (req, res) => {
    res.status(addData('weight', req.body) ? 200 : 500).end();
})  
.post('/secure/shoes-size', (req, res) => {
    res.status(addData('shoes-size', req.body) ? 200 : 500).end();
})
.get('/secure/size', (req, res) => {
    res.json(getData('size'));
})
.get('/secure/weight', (req, res) => {
    res.json(getData('weight'));
})
.get('/secure/shoes-size', (req, res) => {
    res.json(getData('size'));
})

//Member API
.get('/secure/members', (req, res) => {
    res.json(dataService.get());
})
.get('/secure/member/:member', (req, res) => {
    const memberData = dataService.get()[req.params.member];
    if(memberData) { 
        res.json(memberData); 
        return; 
    }
    res.status(404).end();
})
.get('/secure/member/:member/:type', (req, res) => {
    const memberData = dataService.get()[req.params.member];
    if(memberData) {
        const typeOfMemberData = memberData[req.params.type];
        if(typeOfMemberData) {
            res.json(typeOfMemberData);
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
}; 

const getData = (type) => {
     const members = dataService.get();
     const ret = {};
     for(let member in members) {
        ret[member] = {};
        if(members[member][type]) ret[member][type] = members[member][type]
     }
    return ret;
};
