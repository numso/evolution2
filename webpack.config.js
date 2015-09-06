/* @flow */

module.exports = {

  entry: {
    'game.js': './client/game/index.js',
    'editor.js': './client/editor/index.js'
  },

  output: {
    path: 'client/build/',
    filename: '[name]'
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
  }

}
