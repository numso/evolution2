/* @flow */

var webpack = require('webpack')
var os = require('os')

module.exports = {

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  entry: {
    'game.js': [
      'webpack-dev-server/client?http://' + os.hostname() + ':3000',
      'webpack/hot/dev-server',
      './client/game/index.js'
    ],
    'editor.js': [
      'webpack-dev-server/client?http://' + os.hostname() + ':3000',
      'webpack/hot/dev-server',
      './client/editor/index.js'
    ]
  },

  output: {
    path: '/client/build/',
    filename: '[name]',
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['', '.js', 'index.js']
  },

  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json'}
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel?stage=0', exclude: [/node_modules/] }
    ],
    postLoaders: [
      { test: /\.js$/, loader: 'transform?brfs' }
    ]
  },

  devServer: {
    contentBase: 'client/',
    publicPath: '/build/',
    hot: true,
    quiet: true
  },

  devtool: '#eval'

}
