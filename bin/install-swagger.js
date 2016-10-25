var fs = require('fs-extra');
var replace = require("replace");
var cwd = require('path').resolve();
var path = require('path');

try {
  const from = path.join(cwd, './node_modules/swagger-ui/dist');
  const to = path.join(cwd, './public/swagger');
  console.log('copy from %s, to %s', from, to);
  fs.copySync(from, to);

  replace({
    regex: '("api_key", key, "query")',
    replacement: '("Authorization", "JWT " + key, "header")',
    paths: ['./public/swagger/index.html'],
    recursive: false,
    silent: true
  });
  console.log('Install swagger successfully!');
} catch (err) {
  console.error('Failed to install swagger!');
}