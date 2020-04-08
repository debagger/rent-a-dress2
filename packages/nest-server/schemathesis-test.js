const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

function getIPs(){
var os = require('os');
var ifaces = os.networkInterfaces();
const ips = [];
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
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

  require('./dist/server')
    .bootstrap()
    .then(() => {
        const ips = getIPs();
        console.log("IPs found: \n", ips);
      const exec = require('child_process').exec;
      const authHeader =
        'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE1ODQyNjg2OTksImV4cCI6MTU4NDI2ODc1OX0.9FQNp2iVCCP8W1lv950gcXHGSLjrrBw5KW3SVMTxBLA';
      exec(
        `docker run --network="host" kiwicom/schemathesis:stable run http://${ips[0]}/api-json --checks all --exitfirst --header "${authHeader}"`,
        (error, stdout, stderr) => {
          if (error) {
            // console.log('Error when schemathesis runs: \n', error);
            console.log('Error when schemathesis runs: \n', stderr);
            console.log(stdout);  
            process.exit(error.code);
          }
          console.log(stdout);
          process.exit(0);
        },
      );
    });
});
