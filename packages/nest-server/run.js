const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.config');
const StartServerPlugin = require("./StartServerPlugin")

module.exports.run = function(nuxt) {
  config.entry = ['webpack/hot/poll?100', path.join(__dirname, '/src/main-http.ts')]
  config.plugins.push(new StartServerPlugin({ name: 'server.js', nuxt: nuxt }));

  const compiler = webpack(config);

  compiler.watch(
    {
      // Example watchOptions
      aggregateTimeout: 300,
      poll: undefined,
    },
    (err, stats) => {
      // Stats Object
      // Print watch/build result here...
    },
  );
};
