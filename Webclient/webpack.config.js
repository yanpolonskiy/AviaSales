const path = require('path');

const config = {
    entry: {
        app: ["@babel/polyfill", path.resolve(__dirname, 'src/app/index.js')]
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'src/app'),
            img: path.resolve(__dirname, 'src/img')
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 9090,
        contentBase: path.resolve(__dirname, 'public'),
        open: true,
        overlay: true
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env', '@babel/react']
                }
            },
            {
                exclude: /node_modules/, // don't transpile node_modules
                test: /\.jsx$/, // do transpile any files ending in .jsx
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-react-jsx']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader' // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
    // devtool: 'eval-sourcemap'
};

module.exports = config;
