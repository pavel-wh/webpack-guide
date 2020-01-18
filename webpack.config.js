const path = require('path')
const webpack = require('webpack')
const HTMLwebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = extra => isProd ? `[name].[hash].${ extra }` : `[name].${ extra }`
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
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }
    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

const plugins = () => {
    const base = [
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
        new VueLoaderPlugin(),
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: ['./analytics.ts']
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
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
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
                use: jsLoaders()
            },
            { 
                test: /\.ts$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader' ,
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            { 
                test: /\.jsx$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader' ,
                    options: babelOptions('@babel/preset-react')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
}