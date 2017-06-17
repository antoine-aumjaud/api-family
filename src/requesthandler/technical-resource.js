"use strict";

const express = require('express');

const config = require('../conf/api-family.json');
const commonConfig = require('../conf-common.json');

module.exports = express.Router()

.get('/hi',   (req, res) => res.send("hello"))
.get('/info', (req, res) => res.json( { "name": commonConfig.application_name, "version": commonConfig.application_version, "buildDate": commonConfig.build_date } ))

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