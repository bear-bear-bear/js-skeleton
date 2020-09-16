const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "src", "assets", "es6", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "build");
const MODE = "development";

module.exports = {
  mode: MODE,

  devServer: {
    hot: true,
    inline: true,
    open: true,
    overlay: true,
    host: "localhost",
  },

  devtool: "inline-source-map",
  // mode development ? ‘inline-source-map" : 'hidden-source-map’

  entry: ENTRY_FILE,

  output: {
    path: OUTPUT_DIR,
    filename: "es5/bundle.js",
    publicPath: "./",
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          "file-loader?name=html/[name].html",
          "extract-loader",
          "html-loader",
          "pug-html-loader",
        ],
      },
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]?[hash]", //  (mode == "production") ? name: "../img/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new HtmlWebpackPlugin({}),
  ],
};

// module.exports = (env, argv) => {
//   if (argv.mode === "development") {
//   }
//   if (argv.mode === "production") {
//   }
//   return config;
// };
