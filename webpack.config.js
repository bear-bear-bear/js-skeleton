const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "src", "assets", "es6", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "public", "src");
const MODE = "development";

module.exports = {
  mode: MODE,

  entry: ENTRY_FILE,

  output: {
    path: OUTPUT_DIR,
    filename: "es5/bundle.js",
    publicPath: "./src/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // (file-size > limit) ? use file-loader
              publicPath: "../",
              name: "img/[name].[ext]?[hash]", //  (mode == "production") ? name: "../img/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        exclude: /index.pug/, // index.pug use HtmlWebpackPlugin
        use: [
          "file-loader?name=../[path][name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader",
          // 이게 웹팩 도는 동안 만나는 pug 파일들을
          // html로 컴파일해서 아웃풋 폴더에 뿌려주는 코드인데
          // 문제는 그 웹팩 사이클에 pug 파일들을 인식을 시켜야 동작한다는거고
          // 지금 임시방편으로 (엔트리) js 파일에서 pug 파일 일일이 import해서 아웃풋에 출력시키고 있거든?
          // 근데 pug 파일이 많아지면 js 파일에서 파일 하나하나 import 하는 방법이 너무 안 섹시하잖아
          // 다른 방법이 없을까?
          //
          // 이 코드 알아낸 링크 -
          // https://github.com/pugjs/pug-loader/issues/97
          // https://stackoverflow.com/questions/44792582/how-to-output-html-files-from-pug-templates-with-webpack
          //
          // 근데 위에 깃허브 이슈 맨 아래 링크 가보면
          // 예제 올려놓은 친구도 엔트리 js에서 pug파일 import 했어 ㅋㅋㅋㅋ
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    open: true,
    host: "localhost",
    port: 3000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/views/index.pug",
      filename: "../index.html",
    }),
  ],
};

// module.exports = (env, argv) => {
//   if (argv.mode === "development") {
//   }
//   if (argv.mode === "production") {
//   }
//   return config;
// };
