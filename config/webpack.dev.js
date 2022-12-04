/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-02 22:38:50
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 15:15:30
 * @FilePath: /webpack/build/webpack.dev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');// 热更新组件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");// 分析加载
const smp = new SpeedMeasurePlugin();
const path = require('path')
const webpack = require("webpack")
const is=true
const config= merge(common, {
    mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
    devtool: 'eval-cheap-module-source-map', // 开发工具，开启 source map，编译调试
    devServer: {
        port: 3000, // 服务端口号
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        historyApiFallback: true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
        }
    }
})

module.exports =is? smp.wrap(config):config