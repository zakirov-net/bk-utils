const path = require('path');

module.exports = {
  entry: {
    'image-to-asm': './src/image-to-asm.ts'
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
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
