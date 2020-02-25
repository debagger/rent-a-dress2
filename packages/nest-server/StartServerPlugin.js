const cluster = require('cluster');
const path = require('path');

class StartServerPlugin {
  constructor(options) {
    if (options == null) {
      options = {};
    }
    if (typeof options === 'string') {
      options = { name: options };
    }
    
    this.afterEmit = this.afterEmit.bind(this);
    this.apply = this.apply.bind(this);
    this.startServer = this.startServer.bind(this);

    this.app = null;
    this.options = options;
  }

  afterEmit(compilation, callback) {
    this.startServer(compilation, callback);
  }

  apply(compiler) {
    // Use the Webpack 4 Hooks API when possible.
    if (compiler.hooks) {
      const plugin = { name: 'StartServerPlugin' };
      compiler.hooks.afterEmit.tapAsync(plugin, this.afterEmit);
    } else {
      compiler.plugin('after-emit', this.afterEmit);
    }
  }

  startServer(compilation, callback) {
    const { options } = this;
    let name;
    const names = Object.keys(compilation.assets);
    if (options.name) {
      name = options.name;
      if (!compilation.assets[name]) {
        console.error(
          'Entry ' + name + ' not found. Try one of: ' + names.join(' '),
        );
      }
    } else {
      name = names[0];
      if (names.length > 1) {
        console.log(
          'More than one entry built, selected ' +
            name +
            '. All names: ' +
            names.join(' '),
        );
      }
    }
    const { existsAt } = compilation.assets[name];
    this._entryPoint = existsAt;

    this._startServer(app => {
      this.app = app;
      callback();
    });
  }

  clearCache() {
    const cacheKeys = Object.keys(require.cache);
    const paths = [path.join(__dirname, 'dist')];
    cacheKeys
      .filter(item => paths.filter(p => item.startsWith(p)).length > 0)
      .forEach(item => {
        delete require.cache[item];
        console.log(`${item} deleted from cache`);
      });
  }

  _startServer(callback) {
    if (this.app) {
      this.app.close().then(() => {
        this.clearCache();
        const server = require(this._entryPoint);
        server.bootstrap(this.options.nuxt).then(app => {
          callback(app);
        });
      });
    } else {
      const server = require(this._entryPoint);
      server.bootstrap(this.options.nuxt).then(app => {
        callback(app);
      });
    }

  }
}

module.exports = StartServerPlugin;
