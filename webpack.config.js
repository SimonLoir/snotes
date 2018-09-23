const path = require('path');

module.exports = {
    target: 'node',
    entry: {
        snote: './src/snote'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true
};
