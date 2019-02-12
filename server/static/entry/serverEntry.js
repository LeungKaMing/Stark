// test: cnpm install babel-cli --save babel-node server/app.js
// 从这句代码开始，所有代码都会转换成es6格式使用env这个参数
require('babel-polyfill')
require('babel-register')({
    presets: [ 'env' ]
})
const App = require('../pages/App')
module.exports = App