"use strict";

const express    = require('express');
const bodyParser = require('body-parser');

const technicalResource = require('./requesthandler/technical-resource');
const familyResource    = require('./requesthandler/family-resource');

express()
.use(bodyParser.json())
.use('/', technicalResource)
.use('/secure', familyResource)
.listen(9080);
console.log('Family-API started on server 9080');

