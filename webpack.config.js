const path = require('path')
const webpack = require('webpack')
const HTMLwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('IS DEV:', isDev)

const filename = extra => isProd ? `[name].[contenthash].${ extra }` : `[name].${ extra }`
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@models': path.resolve(__dirname, 'src/modals'),
        }
    },
    optimization: optimization(),
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        watchContentBase: true,
        port: 4200,
        compress: true,
        hot: isDev,
    },
    plugins: [
        new HTMLwebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            },
            cache: isProd
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
                to: path.resolve(__dirname, 'dist'),
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
              test: /\.s[ac]ss$/i,
              use: cssLoaders('sass-loader'),
            },
            {
              test: /\.less$/i,
              use: cssLoaders('less-loader'),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.csv$/,
                use: [
                    'csv-loader'
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader' ,
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
        ]
    }
}