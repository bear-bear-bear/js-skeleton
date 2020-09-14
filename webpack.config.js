const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "src", "assets", "es6", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "public");
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
        use: [
          "file-loader?name=html/[name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader",
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
  ],
};

// module.exports = (env, argv) => {
//   if (argv.mode === "development") {
//   }
//   if (argv.mode === "production") {
//   }
//   return config;
// };
