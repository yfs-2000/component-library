const path = require("path");
const { resolve } = path;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const isEnvDevelopment = process.env.NODE_ENV === "production";

module.exports = {
  entry: resolve(__dirname, "../example/index.tsx"),
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: "/",
    path: resolve(__dirname, "../build"),
  },
  mode: "development",
  devtool: "cheap-module-source-map", // 追踪源代码错误
  module: {
    rules: [
      //    { parser: { requireEnsure: false } },
      /* { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
             { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },*/

      {
        test: /\.(ts(x?)|js(x?))$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/, // 检测文件是否是css文件
        use: [
          // 执行顺序：从下到上，从右往左依次执行
          "style-loader", // 创建style标签，将js中的css代码放进标签内生效
          "css-loader", // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")(),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", // 创建style标签，将js中的css代码放进标签内生效
          "css-loader", // 能将css文件打包到js中（会以commonjs方式整合到js文件中）
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
                require("postcss-preset-env")(),
                require("cssnano")(),
              ],
            },
          },
          "less-loader", // 将less编译成css文件
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader", // url-loader是基于file-loader使用
          options: {
            limit: 8192, // 8 * 1024 = 8 kb   8kb以下的图片会被base64处理
            outputPath: "images", // 决定图片的输出路径 （output.path + outputPath）
            name: "[hash:10].[ext]", // 名称  hash:10 取前面10位hash值  ext 自动补全文件扩展名（文件之前是怎么样的扩展名，之后就是怎么样的）
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        loader: "file-loader", // 将文件原封不动输出出去
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
      {
        test: /\.html$/,
        /*use: {
                  loader: 'html-loader'
                }*/
        loader: "html-loader", // 解决html中img问题
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".less", ".ts", ".tsx"], // 自动解析文件扩展名
  },
  performance: {
    hints: false, // 不提示性能问题
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../example/index.html"),
    }),
    new ESLintPlugin({
      // Plugin options
      extensions: ["js", "mjs", "jsx", "ts", "tsx"],
      eslintPath: require.resolve("eslint"),
      failOnError: false,
    }),
    new FriendlyErrorsWebpackPlugin(), //
    new ErrorOverlayPlugin(),
  ],
  devServer: {
    //开启服务器运行构建后的代码
    contentBase: resolve(__dirname, "../build"), //运行代码的路径
    compress: true, //开启gzip压缩  服务器传过来的数据经过压缩 这样会更快
    port: 8000, //端口号
    open: true, //自动打开浏览器
    hot: true, //开启热更新
    quiet: true,
  },
};
