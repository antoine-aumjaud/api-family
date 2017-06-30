"use strict";

// data to Markdown array
exports.formatDataAsArray = (data) => {
    let array = '| Nom | Taille (m) | Poids (kg) | Chaussure |\n'
                + '|---|---:|---:|---:|\n';
    for(let memberName in data) {
        array += '| ' + memberName + ' | ' + formatSize(data[memberName]) + ' | ' + formatWeight(data[memberName]) + ' | ' + formatShoesSize(data[memberName]) + ' |\n';
    }
    return array;
};

// data to Markdown list
exports.formatDataAsList = (data) => {
    let list = "";
    for(let memberName in data) {
        list += '*' + memberName + '* :'
            + (data[memberName].size          ? '\n - mesure '  + formatSize(data[memberName])   + ' m'  : '') 
            + (data[memberName].weight        ? '\n - pèse '    + formatWeight(data[memberName]) + ' kg' :  '')
            + (data[memberName]['shoes-size'] ? '\n - fait du ' + formatShoesSize(data[memberName])      : '') 
            + '\n\n ';
    }
    return list;
};

const formatSize = (member) => {
    if(member.size) {
        if(member.size.cm) {
            let cm = parseInt(member.size.cm); 
            if(cm < 10)
                return member.size.m + '.0' + member.size.cm 
            else 
                return member.size.m + '.' + member.size.cm 
        }  
        else return member.size.m;
    }
    return '';
};
const formatWeight = (member) => {
    if(member.weight)
        return member.weight.kg  + (member.weight.g  ? '.' + parseInt(member.weight.g) : '');
    return '';
};
const formatShoesSize = (member) => {
    if(member['shoes-size'])
        return member['shoes-size'].number;
    return '';
};