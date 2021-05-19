const babelCfg = require('./babelconfig.js');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'production',
  entry: path.resolve(__dirname,'./src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // localIdentName: config.cssScopeName,
                // context: process.cwd(),
              },
              importLoaders: 3,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              // implementation: require('sass'),
            },
          },
        ]
      },
      // css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // localIdentName: config.cssScopeName,
                // context: process.cwd(),
              },
              importLoaders: 3,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              emitFile: true,
              limit: 3 * 1024,
              name: 'images/[name]__[hash:5].[ext]',
              // publicPath: config.assetsPublicPath,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|mp3|mp4)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name]__[hash:5].[ext]',
              // publicPath: config.assetsPublicPath,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [{
          loader: 'babel-loader',
          options: babelCfg,
        }],
        exclude: /(node_modules)/,
      },
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin({
      verbose: true, // Write logs to console.
      dry: false,
    }),
    new webpack.DefinePlugin({
      // 'DEBUG': config.isDev,
      // ...config.definePlugin,
    }),
    new HtmlWebpackPlugin({
      // inject: true,
      cache: false,
      template:'index.html'
    }),
  ]
}

module.exports = config;