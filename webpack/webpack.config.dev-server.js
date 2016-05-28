var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

module.exports = {
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
            loader: 'css/locals?module&localIdentName=[name]__[local]__[hash:base64:5]',
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
          __DEVCLIENT__: false,
          __DEVSERVER__: true
        })
    ]
};
