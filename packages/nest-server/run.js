const webpack = require('webpack');
const config = require('./webpack.config');
const StartServerPlugin = require("./StartServerPlugin")
module.exports.run = function(nuxt) {
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
