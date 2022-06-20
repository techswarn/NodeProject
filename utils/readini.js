const fs = require('fs')
const path = require('path');
const {decode} = require('ini-decode');
console.log(__dirname)

const readFunc = () => {
    try {
        const { json: configs, dts }= decode(fs.readFileSync('/Users/ssuvarna/Desktop/code/Node/backend/config.ini', 'latin1').toUpperCase());
        return configs
    } catch (err) {
        console.error(err);
    }
}

module.exports = {readFunc};