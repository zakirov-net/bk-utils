const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// Установить этот пакет, если решу не собирать npm-зависимости в итоговый скрипт
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    'bk-utils-bkd': './src/bk-utils-bkd.ts',
    'bk-utils-wav': './src/bk-utils-wav.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig-cli.json'
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [new TsconfigPathsPlugin()]
  },
  optimization: {
    minimize: false
  },
  // externals: [nodeExternals()],
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'cli')
  }
};
