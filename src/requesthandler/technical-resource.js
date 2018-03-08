"use strict";

const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

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
    else if(req.header("Authorization") != null) {
        console.log(2);
        const header = req.header("Authorization");
        const token = header.substring(header.indexOf("Bearer") + 7);
        const cert = fs.readFileSync('conf/jwt-public-cert.pem');  // get public key
        jwt.verify(token, cert, function(err, decoded) {
            if(err) {
                console.log("SECURITY: invalid JWT, " + err);
                res.status(401).send('Not authorized');
            }
            else {
                req.header("name", decoded.name);
                req.header("login", decoded.login);
                next();
            }
        });
    }
    else {
        console.log("SECURITY: error on access to this resource")
        res.status(401).send('Not authorized');
    }
})

.get('/secure/reloadConfig', (req, res) => res.status(500).send("Not implemented"))
;