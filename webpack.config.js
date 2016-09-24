/* eslint-env node */
'use strict'

const webpack = require('webpack')
const path = require('path')
const pkg = require('./package.json')

const DEBUG = process.env.NODE_ENV !== 'production'

let config = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'app/client.js')
    ],
    '../service-worker': path.resolve(__dirname, 'app/service-worker.js'),
    // 'sw-toolbox': 'sw-toolbox'
  },
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    publicPath: 'dist',
    filename: '[name].js'
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
    // extensions: ['.js'],
    // alias: {
    //   actions: 'actions',
    //   components: 'components',
    //   core: 'core',
    //   reducers: 'reducers',
    //   routes: 'routes'
    // }
    modules: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'node_modules')
    ]
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}

module.exports = config
