const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  // Where files will be sent after being bundled
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV,
  //webpack dev server
  devServer: {
    port: 8080,
    watchContentBase: false,
    proxy: {
      "/auth/**": "http://localhost:3000",
      "/api": "http://localhost:3000",
      "/plaid": "http://localhost:3000",
      "/secret": "http://localhost:3000",
      "/landing": "http://localhost:3000",
      "/dashboard": "http://localhost:3000",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./client/index.html" })],
};
