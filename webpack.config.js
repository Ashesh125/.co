const path = require('path');

module.exports = {

    entry: './assets/scripts/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};