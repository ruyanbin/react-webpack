/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-02 22:39:00
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 21:51:38
 * @FilePath: /webpack/build/webpack.prod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//打包体积分析
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
    mode: 'production', // 开发模式,打包更加快速,省了代码优化步骤
    optimization: {
      minimize: true,
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          // `...`,
          new TerserPlugin({
              terserOptions: {
                ecma: undefined,
                warnings: false,
                parse: {},
                compress: {
                  drop_console: true,
                  drop_debugger: false,
                  pure_funcs: ['console.log'] // 移除console
                }
              },
          }),
          new CssMinimizerPlugin(),
        ],
        splitChunks: {
          // include all types of chunks
          chunks: 'all',
          // 重复打包问题
          cacheGroups:{
            vendors:{ //node_modules里的代码
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
              name: 'vendors', //chunks name
              priority: 10, //优先级
              enforce: true 
            }
          }
        },
      },
    plugins:[
        // new BundleAnalyzerPlugin()
    ]
})