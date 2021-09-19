const path = require('path')

module.exports = {
    assets: path.resolve(__dirname, '../assets'),
    build: path.resolve(__dirname, '../dist'),
    entry: path.resolve(__dirname, '../src/index.js'),
    public: path.resolve(__dirname, '../public'),
    src: path.resolve(__dirname, '../src'),
    template: path.resolve(__dirname, '../public/index.html'),
}
