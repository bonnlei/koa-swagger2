var replace = require("replace");

try {
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