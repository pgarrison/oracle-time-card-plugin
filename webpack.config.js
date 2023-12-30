const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'content-script': './src/content-script/content-script.ts',
    'service-worker': './src/service-worker.ts',
    'settings': './src/settings-page/settings.js',
  },
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            { from: 'src/manifest.json' },
            { from: 'src/icons', to: 'icons' },
            { from: 'src/settings-page/settings.html' },
        ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};