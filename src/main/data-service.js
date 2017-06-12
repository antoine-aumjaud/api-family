"use strict";

const FILE_NAME = 'data/family.json';

const fs = require('fs');
fs.readFile(FILE_NAME, 'utf8', (err, data) => {
  if (err || !data) dataJson = {};
  else dataJson = JSON.parse(data);
  console.log(`File ${FILE_NAME} loaded`);
});

let dataJson;

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
}

//get data
exports.get = () => {
    return dataJson; 
}
