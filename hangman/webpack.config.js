const path = require('path');
const MiniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCss.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCss({
      filename: 'style.css',
    }),
  ],
};
