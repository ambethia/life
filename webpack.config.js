const path = require('path')

const SOURCE_PATH = path.resolve(__dirname, 'src')
const BUILD_PATH = path.resolve(__dirname, 'public')

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(SOURCE_PATH, 'index.js')
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: ['node_modules']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: BUILD_PATH
  }
}
