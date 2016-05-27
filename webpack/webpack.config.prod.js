var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var postCSSConfig = function() {
  return [
    require('postcss-import')(),
    require('postcss-mixins')(),
    require('postcss-simple-vars')(),
    require('postcss-nested')(),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    }),
    require('postcss-reporter')({
      clearMessages: true
    })
  ]
}

var preLoaders = [{
    test: /\.jsx?$/,
    include: path.join(__dirname, '..', 'app'),
    loader: 'eslint'
}]

var loaders = [
  {
    test: /\.jsx?$/,
    include: path.join(__dirname, '..', 'app'),
    loader: 'react-hot!babel',
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000,
    }
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  },
  {
    test:/\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader')
  }
]

module.exports = [{
    devtool: 'eval',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: './client'
    },
    target: 'node',
    output: {
        path: assetsPath,
        filename: '[name].js',
        publicPath: '/assets/',
    },
    module: {
        preLoaders: preLoaders,
        loaders: loaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new ExtractTextPlugin('styles/main.css'),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          },
          output: {
            comments: false
          }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new InlineEnvironmentVariablesPlugin({
          NODE_ENV: 'production'
        })
    ],
    postcss: postCSSConfig
  },
  {
    context: path.join(__dirname, '..', 'app'),
    entry: {
      server: './server'
    },
    target: 'node',
    output: {
      path: assetsPath,
      filename: 'server.js',
      publicPath: '/assets/',
      libraryTarget: 'commonjs2'
    },
    module: {
      preLoaders: preLoaders,
      loaders: loaders
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        // Order the modules and chunks by occurrence.
        // This saves space, because often referenced modules
        // and chunks get smaller ids.
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('styles/main.css'),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          },
          output: {
            comments: false
          }
        }),
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: false
        }),
        new InlineEnvironmentVariablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: postCSSConfig
  }
];
