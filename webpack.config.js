const path = require('path');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: 'main.js'
    }
};

module.exports = conf;