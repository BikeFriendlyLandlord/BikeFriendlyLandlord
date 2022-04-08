const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './client/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // publicPath: '/build'
  },
  resolve: {
    fallback: {
      "http": false,
      "fs": false,
      "os": false,
      "path": false
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      publicPath: process.env.NODE_ENV === 'production' ? 'build' : 'auto',
      // chunks: ['index'],
    }),
    // "@babel/plugin-transform-runtime"
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    magicHtml: true,
    proxy: {
      '/auth': 'http://localhost:3000',
      '/reviews': 'http://localhost:3000',
      '/landlords': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
    },
  },
};

