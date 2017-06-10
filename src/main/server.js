const APP_NAME = "api-family";
const APP_VERSION = "0.0.1";


const express = require('express');
const app = express()
app
//.configure()
.get('/hi', (req, res) => res.send("hello"))
.get('/info', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify( { "name": APP_NAME, "version": APP_VERSION } ));
})

//TODO logs
//TODO secure
.post('/size/:name', (req, res) => {
    const name = req.params.name;

})  
.post('/weight/:name', (req, res) => {
    const name = req.params.name;

})  
.post('/shoes-size/:name', (req, res) => {
    const name = req.params.name;

})  

.listen(9080);
console.log('Familly-API started on server 9080');

 
