const path = require('path');

// TODO: use https://github.com/webpack-contrib/mini-css-extract-plugin instead
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const conf = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    // publicPath: 'dist/'
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
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
        // loader: 'pug-loader',
        // options: {
        //   pretty: true
        // }
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
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
      }, {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        // test: /\.(jpg|png)$/,
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }]
      },
      // =====
      // multiple html files: (need import in index.js - import '../users.html';)
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]'
      //     }
      //   }],
      //   exclude: path.resolve(__dirname, 'src/index.html')
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'users.html',
      template: './src/users.html',
      // chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'info.html',
      template: './src/info.pug'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = (env, options) => {
  if (options.mode !== 'production') {
    conf.devtool = 'eval-sourcemap'; // create sourcemap for production mode
  }
  return conf;
}