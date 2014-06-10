var express = require('express')
, app = express()
, routes = require('./routes')
, api = require('./routes/api'),
server = require('http').createServer(app);

app.configure(function() {
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
 // app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "128.151.38.107");
  app.locals.pretty = true;
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret!' }));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use('/components', express.static(__dirname + '/components'));
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
});

app.get('/', routes.index); // main page
app.get('/p/:name', routes.p); //redirect routes

app.get('/api/service', api.services); //look at all
app.get('/api/service/:id', api.service); //look at one
app.post('/api/service', api.add); //add service
app.put('/api/service/:id', api.edit); //edit&update service
app.delete('/api/service/:id', api.delete); //delete service

server.listen(app.get('port'), /*app.get('ipaddr'), */function(){
  console.log("Express server up and running for the API on port " + app.get('port')/* + " on IP " + app.get('ipaddr')*/);
});