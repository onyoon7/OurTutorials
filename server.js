const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    inline: true,
    noInfo: true,
    hot: true,
    colors: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function(err, results){
    if(err) return console.log(err);
    console.log('Listening at http://localhost:3000/');
});
