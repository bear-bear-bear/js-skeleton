const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "es6", "js", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "public", "es5", "js");
const CSS_DIR = path.resolve(__dirname, "public", "es5", "css");
const MODE = "development";

// // Apply this function when there are many items to be excluded from the module during bundling.
// // exclude: exclude.exportList(extName) ( ex - exclude: exclude.exportList("js") )
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
    filename: "index.js",
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/style.css",
    }),
  ],
};
