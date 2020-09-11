const path = require("path");
const ENTRY_FILE = path.resolve(__dirname, "src", "es6", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "public", "src", "es5");
const MODE = "development";

// const exclude = {
//   exportList: function (ext) {
//     const path = require("path");

//     for (let [name, list] of Object.entries(this)) {
//       if (name === ext) {
//         let absolutePath = path.resolve(__dirname, ...list[0]);

//         return absolutePath;
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
    filename: "[name].js",
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: path.resolve(__dirname, "node_modules"),
  //       // exclude: exclude.exportList("js"),
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: ["env"],
  //         },
  //       },
  //     },
  //   ],
  // },
};
