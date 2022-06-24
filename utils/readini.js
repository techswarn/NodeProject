const fs = require('fs')
const path = require('path');
const ini = require('ini');
console.log(__dirname)

const readFunc = () => {
    
    try {
        const config = ini.decode(fs.readFileSync('/Users/ssuvarna/Desktop/code/Node/backend/names.dat', 'latin1').toUpperCase());
        return config
    } catch (err) {
        console.error(err);
    }
}

module.exports = {readFunc};