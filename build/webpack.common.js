/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-02 22:38:41
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 15:27:34
 * @FilePath: /webpack/build/webpack.base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const paths = require('./paths');
const { resolveApp } = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')//编译进度条；
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取 CSS 到独立 bundle 文件。
const isDev = process.env.NODE_ENV === 'development' // 
console.log(isDev,'isDev')
module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    // 打包文件出口
    output: {
        //   // bundle 文件名称
        filename: '[name].[contenthash].bundle.js',

        // path: path.join(__dirname, '../dist'), // 打包结果输出路径
        path: paths.appDist, // 打包结果输出路径


        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        // publicPath: '/' // 打包后文件的公共前缀路径
    },
    resolve: {
        alias: {//配置别名，简化模块引入
            "@": path.resolve(__dirname, "src"),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],//在引入模块时可不带后缀；
        symlinks: false,//用于配置 npm link 是否生效，禁用可提升编译速度。
    },

    module: {
        rules: [
            {
                /**js的配置 */
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "../src"), // 表示只解析以下目录，减少loader处理范围
                exclude: /node_modules/, // 排除node_modules中的代码
                use: [
                  {
                    loader: "babel-loader", // 只是babel和webpack之间的桥梁，并不会将代码转译
                    options: {
                      cacheDirectory: true,
                    },
                  },
                ],
              },
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            // 图片
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                include: [
                    paths.appSrc,
                ],
                type: 'asset/resource',
            },
            // 字体
            {
                test: /.(woff|woff2|eot|ttf|otf)$/i,
                include: [
                    paths.appSrc,
                ],
                type: 'asset/resource',
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    {
                        loader: isDev?'style-loader':MiniCssExtractPlugin.loader,
                        // options: {
                        //     publicPath: '../',
                        // },
                    },
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
      
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        }),
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin({
            ignoreOrder: true,  
            filename: "static/css/[name].[contenthash:5].css",
            chunkFilename: "static/css/[name].[contenthash:5].css",
        }),//

    ]
}