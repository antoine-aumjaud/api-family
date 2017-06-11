const APP_NAME = "api-family";
const APP_VERSION = "0.0.1";

let config = require('./conf/api-family.json');

const express = require('express');
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

.post('/secure/size/:name', (req, res) => {
    const name = req.params.name;

})  
.post('/secure/weight/:name', (req, res) => {
    const name = req.params.name;

})  
.post('/secure/shoes-size/:name', (req, res) => {
    const name = req.params.name;

})  

.listen(9080);
console.log('Familly-API started on server 9080');


