/* eslint-env node */
'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const pkg = require('./package.json')

const DEBUG = process.env.NODE_ENV !== 'production'

// Load all dependecies except sw-toolbox which is only needed for the service-worker
const vendorDependecies = Object.keys(pkg.dependencies)

const chunkName = '[name].[chunkhash].js'

let config = {
  entry: {
    vendor: vendorDependecies,
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'app/client.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    publicPath: 'dist',
    filename: chunkName
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

config.plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: chunkName }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.ejs'),
    filename: '../index.html'
  })
]

if (!DEBUG) {
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    ...config.plugins
  ]
}

module.exports = config
