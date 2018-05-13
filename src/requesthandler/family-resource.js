"use strict";

const express = require('express');

const dataService     = require('../service/data-service');
const markdownService = require('../service/markdown-service');

module.exports = express.Router()

//Reset cache
.get('/resetCache', (req, res) => {
    dataService.resetCache() 
    res.status(200).send("done");
})

//Category API
.post('/size', (req, res) => {
    addData('size', req.body);
    res.status(200).end();
})
.post('/weight', (req, res) => {
    addData('weight', req.body);
    res.status(200).end();
})  
.post('/shoes-size', (req, res) => {
    addData('shoes-size', req.body);
    res.status(200).end();
})
.get('/size', (req, res) => {
    res.json(getDataByType('size', req.query.filter));
})
.get('/weight', (req, res) => {
    res.json(getDataByType('weight', req.query.filter));
})
.get('/shoes-size', (req, res) => {
    res.json(getDataByType('shoes-size', req.query.filter));
})

//Member API
.get('/members', (req, res) => {
    const data = getData(req.query.filter);
    res.format({
        text:    () => res.send(markdownService.formatDataAsList(dataService.getLast())),
        default: () => res.json(getData(req.query.filter))
    });
})
.get('/member/:member', (req, res) => {
    const data = getData(req.query.filter);
    const memberData = data[req.params.member];
    if(memberData) { 
        res.json(memberData); 
        return; 
    }
    res.status(404).end();
})
.get('/member/:member/:type', (req, res) => {
    const data = getData(req.query.filter);
    const memberData = data[req.params.member];
    if(memberData) {
        const typeOfMemberData = memberData[req.params.type];
        if(typeOfMemberData) {
            res.json(typeOfMemberData);
            return;
        }
    }
    res.status(404).end();
})
;


/*
 * PRIVATE
 */
const addData = (type, message) => {
    //prepare message
    const firstname = message.firstname;
    delete message.firstname;
    if(message.date == null) {
        message.date = Date.now();
    }
    //call service
    return dataService.add(firstname, type, message);
}; 
const getData = (filter) => {
    return filter === 'last' ? dataService.getLast() : dataService.get();
};
const getDataByType = (type, filter) => {
    const members = getData(filter);
    const ret = {};
    for(let member in members) {
        ret[member] = {};
        if(members[member][type]) ret[member][type] = members[member][type];
    }
    return ret;
};