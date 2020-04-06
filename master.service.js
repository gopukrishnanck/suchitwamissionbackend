var server = require('./server.js');
var routes = ['state','userblock','notification','userdistrict','userlsgi','userstate','usersurveyor','district','surveyresultharitha','roleharitha','lsgi_type','lsgi_block','lsgi','ward','accesscontrollerharitha','question'];
var serviceName = "master";
server.start(serviceName, routes);
