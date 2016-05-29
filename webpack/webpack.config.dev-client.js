var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


var postCSSConfig = function() {
  return [
    require('postcss-import')({
      path: path.join(__dirname, '..', 'app', 'css'),
      // addDependencyTo is used for hot-reloading in webpack
      addDependencyTo: webpack
    }),
    require('postcss-simple-vars')(),
    // Unwrap nested rules like how Sass does it
    require('postcss-nested')(),
    //  parse CSS and add vendor prefixes to CSS rules
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    }),
    // A PostCSS plugin to console.log() the messages registered by other
    // PostCSS plugins
    require('postcss-reporter')({
      clearMessages: true
    })
  ];
};

module.exports = {
    devtool: 'eval',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      app: ['./client', hotMiddlewareScript]
    },
    output: {
        path: assetsPath,
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
        preLoaders: [
        {
            test: /\.jsx?$/,
            include: path.join(__dirname, '..', 'app'),
            loader: 'eslint'
        }
        ],
        loaders: [
        {
            test: /\.jsx?$/,
            include: path.join(__dirname, '..', 'app'),
            loader: 'react-hot!babel',
        },
        {
            test:/\.css$/,
            loader: 'style!css?module&localIdentName=[local]!postcss-loader',
        },
        {
            test:/\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url',
            query: {
              name: '[hash].[ext]',
              limit: 10000,
            }
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        },
        {
            test:/\.html$/,
            loader: 'html'
        }
        ]
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          __DEVCLIENT__: true,
          __DEVSERVER__: false
        })
    ],
    postcss: postCSSConfig
};
