const nodeExternals = require('webpack-node-externals')
const path = require('path')
const env = process.env.NODE_ENV

module.exports = {
  target: 'node',
  externals: [ nodeExternals() ],
  mode: env || 'development',
  entry: {
    index: './server/watcher.js'
  },
  output: {
    path: path.join(__dirname, 'server-dist'),
    filename: 'watcher.bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
