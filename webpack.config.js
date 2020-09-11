const path = require("path");

module.exports = {
  entry: {
    main: "./src/es6/main.js",
  },
  output: {
    path: path.resolve(__dirname, "./public/src/es5"),
    filename: "main.js",
  },
};
