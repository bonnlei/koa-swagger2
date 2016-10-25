'use strict';

var koa = require('koa'),
    router = require('koa-route'),
    serve = require('koa-static');
var path = require('path');
var swagger = require(path.join(__dirname, '../../index')),
    api = require(path.join(__dirname, './api'));


var app = koa();
var port = process.env.NODE_PORT || 3000;

app.use(swagger.init({
  swagger: '2.0', // or swaggerVersion as backward compatible
  info: {
    version: '1.0',
    title: 'Swagger 2.0 Koa example'
  },
  tags: [
    {
      name: 'example',
      description: 'Just an example API'
    }
  ],
  host: 'localhost:' + port,
  apis: [path.join(__dirname, './api.js'), path.join(__dirname, './api.coffee'),
    path.join(__dirname, './api.yml')],
  produces: [
    'application/json',
    'text/xml'
  ],
  consumes: [
    'application/json',
    'text/xml'
  ],

  // koa-swagger2 proprietary
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/'
}));

app.use(serve(path.join(__dirname, '..', 'public')));

app.use(router.get('/', function * () {
  this.body = 'Swagger Koa2';
}));

app.use(router.post('/login', api.login));
app.use(router.get('/hello', api.hello));

app.listen(port, function () {
  console.log('Server running on port ' + port);
});
