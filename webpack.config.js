const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const conf = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers:['ie >= 8', 'last 4 version']
                  })
                ],
                // sourceMap: true
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }]
      }
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
    conf.devtool = 'eval-sourcemap';
  }
  return conf;
}