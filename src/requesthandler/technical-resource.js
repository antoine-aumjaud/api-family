"use strict";

const express = require('express');

const config = require('../conf/api-family.json');

const APP_NAME    = "api-family";
const APP_VERSION = "1.0.0";

module.exports = express.Router()

.get('/hi',   (req, res) => res.send("hello"))
.get('/info', (req, res) => res.json( { "name": APP_NAME, "version": APP_VERSION } ))

.all('/secure/*', (req, res, next) => {    
    if(req.header("secure-key") === config.secureKey
    || req.query["secure-key"] === config.secureKey) {
        next();
    }
    else {
        console.log("SECURITY: error on access to this resource")
        res.status(401).send('Not authorized');
    }
})

.get('/secure/reloadConfig', (req, res) => res.status(500).send("Not implemented"))
;