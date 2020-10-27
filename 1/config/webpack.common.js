const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV === 'development';
const APP_CONFIG = require('../env-config.json');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        verdor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'verdors',
          chunks: 'all',
          priority: -10
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: -20
        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },

          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new webpack.DefinePlugin({
      APP_CONFIG: JSON.stringify(APP_CONFIG)
    }),
    new webpack.ProvidePlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), '.', 'index.html')
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '..', 'src'),
      common: path.resolve(__dirname, '..', 'common'),
      react$: path.resolve(__dirname, '..', 'node_modules/react')
    },
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, '..', 'src'), 'node_modules']
  }
};
