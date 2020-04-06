var server = require('./server.js');
var routes = ['state','userblock','notification','userdistrict','userlsgi','userstate','usersurveyor','district','surveyresultharitha','roleharitha','lsgi_type','lsgi_block','lsgi','ward','accesscontrollerharitha','question','composting','sub_category','category','block_panchayath','grade','settings'];
var serviceName = "master";
server.start(serviceName, routes);
