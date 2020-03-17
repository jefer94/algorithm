// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

/* config-overrides.js */
module.exports = function override(config, env) {
  console.log(config.target, process.env.ENV)
  if (process.env.ENV === 'electron') config.target = 'electron-renderer'
  // return { ...config, plugins: [...config.plugins, new MonacoWebpackPlugin()] };
  return config
}