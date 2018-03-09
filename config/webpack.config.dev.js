const merge = require('webpack-merge');
const ip = require('ip').address();
const webpack = require('webpack');
const path = require('path');

const utils = require('./utils');
const PATHS = utils.paths();

exports.developmentConfig = merge([
  {
    entry: {
      index: [
        PATHS.app + '/polyfills.js',
        'react-hot-loader/patch',
        PATHS.app,
      ],
    },
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      public: ip ? `${ip}:${process.env.PORT || '8080'}` : undefined,
      host: process.env.HOST || '0.0.0.0', // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1, modules: true, localIdentName: '[name]-[local]' } },
            { loader: 'postcss-loader', options: { plugins: [
              require('postcss-smart-import')(),
              require('postcss-cssnext')(),
              require('postcss-responsive-type')(),
            ] }},
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  utils.setFreeVariable('process.env.NODE_ENV', 'development'),
]);
