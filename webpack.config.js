const path = require('path');

module.exports = {
    entry: './src/app.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    "presets": ["@babel/preset-env", "@babel/preset-react"],
                    "plugins": [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ["@babel/plugin-proposal-class-properties", { loose: true }]
                    ]
                }
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
        modules: [
            'node_modules'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js'
    },
    externals: {
        jquery: 'jQuery'
    },
    performance : {
        hints : false
    }
};