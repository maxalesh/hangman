const path = require('path');
const miniCss = require('mini-css-extract-plugin');

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
        use: [miniCss.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new miniCss({
      filename: 'style.css',
    }),
  ],
};
