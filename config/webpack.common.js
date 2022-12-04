/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-02 22:38:41
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 19:09:44
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
const isDev = process.env.NODE_ENV === 'development' // 判断是否为开发环境
const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);
console.log(isDev, 'isDev')
module.exports = {
    // target: ['browserslist'],//告知 webpack 为目标(target)指定一个环境。默认值为 "browserslist"，如果没有找到 browserslist 的配置，则默认为 "web"
    // 选项让你更精确地控制 bundle 信息该怎么显示
    stats: 'errors-warnings',//'errors-only'只在发生错误时输出 'errors-warnings' 只在发生错误或有警告时输出
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    // 打包文件出口
    output: {
        pathinfo: isDev,//告知 webpack 在 bundle 中引入「所包含模块信息」的相关注释 production 模式时的默认值为 false
        // publicPath: paths.publicUrlOrPath, // 打包后文件的公共前缀路径
        filename: !isDev ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        path: paths.appDist, // 打包结果输出路径
        chunkFilename: !isDev ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',//与 output.filename 相同，不过应用于 Asset Modules。
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        // publicPath: '/' // 打包后文件的公共前缀路径
    },
    resolve: {
        alias: {//配置别名，简化模块引入
            "@": paths.appSrc,
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'],//在引入模块时可不带后缀；
        symlinks: false,//用于配置 npm link 是否生效，禁用可提升编译速度。
    },

    module: {
        rules: [
            // 将 HTML 导出为字符串。当编译器需要时，将压缩 HTML 字符串。
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    // Disables attributes processing
                    sources: true,
                },
            },

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

                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: imageInlineSizeLimit,
                    },
                },
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
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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