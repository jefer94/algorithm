// const rewireEslint = require('react-app-rewire-eslint')
 
/* config-overrides.js */
module.exports = function override(config, env) {
  // config = rewireEslint(config, env)
  console.log(config)
  console.log(env)
  return config
}