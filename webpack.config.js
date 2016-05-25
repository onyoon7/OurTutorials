var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        preLoaders: [
        {
            test: /\.jsx?$/,
            include: path.join(__dirname, 'src'),
            loader: 'eslint'
        }
        ],
        loaders: [
        {
            test: /\.jsx?$/,
            include: path.join(__dirname, 'src'),
            loader: 'react-hot!babel',
        },
        {
            test:/\.css$/,
            loader: 'style!css',
        }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
