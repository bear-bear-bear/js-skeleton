const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "es6", "js", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "public", "es5", "js");
const MODE = "development";

// // Apply this function when there are many items to be excluded from the module during bundling.
// // exclude: exclude.exportList(exclude.key)
// const exclude = {
//   exportList: function (ext) {
//     const path = require("path");

//     for (let [name, list] of Object.entries(this)) {
//       if (name === ext) {
//         let absolutePathList = [];

//         for (let relativePath of list) {
//           absolutePathList.push(path.resolve(__dirname, ...relativePath));
//         }

//         return absolutePathList;
//       }
//     }
//   },

//   js: ["node_modules"],
//   /* ... */
// };

module.exports = {
  mode: MODE,

  entry: ENTRY_FILE,

  output: {
    path: OUTPUT_DIR,
    filename: "bundle.js",
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
              limit: 8192, // ( file-size > limit ) ? use file-loader
              name: "../img/[name].[ext]?[hash]",
              publicPath: "../img/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/style.css",
    }),
  ],
};
