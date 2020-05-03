const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

process.env.DATABASE_PATH = ':memory:';
process.env.IMG_PATH = fs.mkdtempSync(path.join(os.tmpdir(), 'img_'));

function getIPs() {
  var os = require('os');
  var ifaces = os.networkInterfaces();
  const ips = [];
  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      ips.push(iface.address);
    });
  });
  return ips;
}

config.entry = [path.join(__dirname, '/src/main-http.ts')];
const compiler = webpack(config, (err, stats) => {
  if (err) return console.log(err);
  if (stats.hasErrors()) return stats.compilation.errors;
  console.log('Compilation finished. Run server...');

  require('./dist/server')
    .bootstrap()
    .then(async res => {
      const adminToken = await res.getAdminToken();
      console.log(adminToken);
      const ips = getIPs();
      console.log('IPs found: \n', ips);
      const spawn = require('child_process').spawn;
      const authHeader = `Authorization: Bearer ${adminToken}`;
      const child = spawn(
        'docker',
        [
          'run',
          '--network=host',
          'kiwicom/schemathesis:stable',
          'run',
          `http://${ips[0]}/api-json`,
          '--checks',
          'all',
          '--exitfirst',
          '--header',
          authHeader,
          '--show-errors-tracebacks'
        ],
        {
          stdio: 'inherit',
        },
      );

      child.on('error', function(err) {
        console.log(err);
        process.exit(1);
      });

      child.on('close', function(code) {
        console.log('Finished with code ' + code);
        process.exit(code);
      });
    })
    .catch(err => {
      console.log(err);
    });
});
