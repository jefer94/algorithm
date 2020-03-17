// const rewireEslint = require('react-app-rewire-eslint')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

/* config-overrides.js */
module.exports = function override(config, env) {
  return { ...config, plugins: [...config.plugins, new MonacoWebpackPlugin()] };
}