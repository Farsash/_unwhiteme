const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './static/dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    }
};

module.exports = conf;