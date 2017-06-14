"use strict";

// data to Markdown array
exports.formatDataAsArray = (data) => {
    let array = '| Nom | Taille (m) | Poids (kg) | Chaussure |\n'
                + '|---|---:|---:|---:|\n';
    for(let member in data) {
        array += '| ' + member 
            + ' | ' + (data[member].size          ? data[member].size.m    + '.' + data[member].size.cm   : '') 
            + ' | ' + (data[member].weight        ? data[member].weight.kg + '.' + data[member].weight.g  : '') 
            + ' | ' + (data[member]['shoes-size'] ? data[member]['shoes-size'].number : '') 
            + ' |\n';
    }
    return array;
};

// data to Markdown list
exports.formatDataAsList = (data) => {
    let list = "";
    for(let member in data) {
        list += '*' + member + '* : '
            + (data[member].size          ? '\n* mesure ' + data[member].size.m    + '.' + data[member].size.cm  + 'm' : '') 
            + (data[member].weight        ? '\n* pèse '   + data[member].weight.kg + '.' + data[member].weight.g + 'kg' : '') 
            + (data[member]['shoes-size'] ? '\n* fait '   + data[member]['shoes-size'].number + ' de pointure' : '') 
            + '\n\n';
    }
    return list;
};
