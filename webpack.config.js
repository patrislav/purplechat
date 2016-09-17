/* eslint-env node */
'use strict'

const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')

const DEBUG = process.env.NODE_ENV !== 'production'

let config = {
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
      actions: 'actions',
      components: 'components',
      core: 'core',
      reducers: 'reducers',
      routes: 'routes'
    }
  },
  devtool: DEBUG ? 'source-map' : 'cheap-module-source-map'
}

if (!DEBUG) {
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}

module.exports = config
