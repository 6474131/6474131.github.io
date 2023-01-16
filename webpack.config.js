const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images/',
          //the images will be emitted to dist/assets/images/ folder
        },
      },
    ],
  },
  plugins: [
    /* Use the ProvidePlugin constructor to inject jquery implicit globals */
    new webpack.ProvidePlugin({
                                $: "jquery",
                                jQuery: "jquery",
                                "window.jQuery": "jquery'",
                                "window.$": "jquery",
                              }),
    new HtmlWebpackPlugin({template: "./src/index.html"}),
  ],
};