// Reference: https://github.com/facebookincubator/create-react-app/issues/1354

process.env.NODE_ENV = 'development'
var reactScriptsConfig = require('react-scripts/config/webpack.config.dev')
module.exports = Object.assign({}, reactScriptsConfig, {
  output: Object.assign({}, reactScriptsConfig.output, {
     path: '../resources/static'
  })
})
 