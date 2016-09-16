/* eslint-env node */
'use strict'

const path = require('path')
const pkg = require('./package.json')

const DEBUG = true

const config = {
  entry: [
    path.resolve(__dirname, 'app/client.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    publicPath: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'app'),
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: pkg.babel.presets,
          plugins: pkg.babel.plugins,
        }
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'app'),
    extensions: ['', '.js'],
    alias: {
      components: 'components',
      core: 'core'
    }
  },
  devtool: DEBUG && 'source-map'
}

module.exports = config
