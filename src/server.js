"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const nodelib    = require('api-nodelib')

const technicalRouter = new nodelib.ExpressApp('api-family').router();
const familyResource = require('./requesthandler/family-resource');

express()
.use(bodyParser.json())
.use('/', technicalRouter)
.use('/secure', familyResource)
.listen(9080);
console.log('Family-API started on server 9080');

