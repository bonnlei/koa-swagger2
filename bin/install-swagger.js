var fs = require('fs-extra');
var replace = require("replace");
var path = require('path');

try {
  const from = path.join('./node_modules/swagger-ui/dist');
  const to = path.join('./public/swagger');
  console.log('copy from %s, to %s', from, to);
  fs.copySync(from, to);

  replace({
    regex: '("api_key", key, "query")',
    replacement: '"Authorization", "JWT " + key, "header"',
    paths: [path.join('./public/swagger/index.html')],
    recursive: false,
    silent: true
  });
  console.log('Install swagger successfully!');
} catch (err) {
  console.error('Failed to install swagger!');
}