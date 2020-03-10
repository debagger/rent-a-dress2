const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?100', path.join(__dirname, '/src/main.ts')],
  watch: true,
  target: 'node',
  devtool: 'source-map',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
    'typeorm',
    '@nestjs/swagger',
    '@nestjsx/crud',
    'class-validator'
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { logInfoToStdOut: true, logLevel: 'info' },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};
