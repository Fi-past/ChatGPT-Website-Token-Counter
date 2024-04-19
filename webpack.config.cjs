const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './content.js', // 你的入口文件
    optimization: {
        minimize: false  // 禁用压缩
    },
    output: {
        filename: 'contentWebpack.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist'), // 输出路径
    },
    mode: 'development', // 或 'production'
    target: 'node',
    resolve: {
        fallback: {
            fs: require.resolve('browserify-fs')
        }
    }
};
