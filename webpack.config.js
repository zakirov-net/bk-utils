const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: {
    'bkd': './src/bkd.ts',
    'image-to-asm': './src/image-to-asm.ts',
    'wav-converter': './src/wav-converter.ts'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
