const path = require('path');

// TODO: use https://github.com/webpack-contrib/mini-css-extract-plugin instead
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin')



const conf = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: '/node_modules/'
      }, {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          // fallback: 'style-loader', // отменить
          use: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/index.template.ejs',
    //   inject: 'body',
    // }),
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = (env, options) => {
  if (options.mode !== 'production') {
    conf.devtool = 'eval-sourcemap'; // create sourcemap for production mode
  }
  return conf;
}