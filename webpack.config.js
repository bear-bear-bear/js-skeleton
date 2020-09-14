const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ENTRY_FILE = [
  path.resolve(__dirname, "src", "assets", "es6", "main.js"),
  path.resolve(__dirname, "src", "views", "index.pug"),
];
const OUTPUT_DIR = path.resolve(__dirname, "public", "src", "es5");
const MODE = "development";

module.exports = {
  mode: MODE,

  entry: ENTRY_FILE,

  output: {
    path: OUTPUT_DIR,
    filename: "bundle.js",
    publicPath: "/public/",
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
              publicPath: "../img/",
              name: "../img/[name].[ext]?[hash]", //  (mode == "production") ? name: "../img/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
    ],
  },
  devServer: {
    contentBase: __dirname + "/dist/",
    hot: true,
    open: true,
    host: "localhost",
    port: 3000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
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
