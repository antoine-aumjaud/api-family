"use strict";

const express    = require('express');
const bodyParser = require('body-parser');

const technicalResource = require('./requesthandler/technical-resource');
const familyResource    = require('./requesthandler/family-resource');

express()
.use('/', technicalResource)
.use('/secure', familyResource)
.use(bodyParser.json())
.listen(9080);
console.log('Familly-API started on server 9080');

