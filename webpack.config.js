var path = require('path');
var webpack = require('webpack');

var config = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: [
            'node_modules',
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        port: 8700,
        inline: true,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(mod, count) {
                // Don't include things under '/src' folder
				return mod.resource && mod.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
            },
        }),
        new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
        new webpack.ProvidePlugin({
			ko: 'knockout',
		}),
    ],
};

module.exports = config;