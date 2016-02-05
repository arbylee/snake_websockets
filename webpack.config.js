var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: __dirname + "/public/js/client.js",
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'templates/index.ejs'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
