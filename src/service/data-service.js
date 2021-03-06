"use strict";

const fs = require('fs');

const FILE_NAME = 'data/family.json';

let dataJson;
const _loadFile = () => {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (err || !data) dataJson = {};
        else dataJson = JSON.parse(data);
        console.log(`File ${FILE_NAME} loaded`);
    });
};
_loadFile();

//add data 
exports.add = (firstname, type, message) => {
    //prepare target object
    if(!dataJson[firstname])       dataJson[firstname] = {};
    if(!dataJson[firstname][type]) dataJson[firstname][type] = [];
    dataJson[firstname][type].push(message);

    //save file
    fs.writeFile(FILE_NAME, JSON.stringify(dataJson, null, 2), 'utf8', function(err) {
        if(err) throw new Error("Can't save file: " + err); //Stop the program
        console.log(`Data ${firstname}.${type} added in data file`);
    });
};

//get data
exports.get = () => {
    return dataJson; 
};
exports.getLast = () => {
    const ret = {};
    for(let member in dataJson) {
        ret[member] = {};
        for(let type in dataJson[member]) {
            ret[member][type] = dataJson[member][type][dataJson[member][type].length-1];
        }
    }
    return ret;
};

//reload file from disk
exports.resetCache = _loadFile;

