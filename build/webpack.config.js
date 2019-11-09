const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
  mode,
  entry: './demo/main.js',
  output: {
    path: path.resolve(__dirname, '../demo/dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: '#source-map',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './demo/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "demo/dist"),
    compress: true,
    port: 8000
  }
}