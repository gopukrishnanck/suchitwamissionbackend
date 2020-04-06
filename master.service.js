var server = require('./server.js');
var routes = ['state','district','percentage_configuration','sub_category','lsgi_type','lsgi_block','lsgi','block_panchayath','category','waste_category','settings','ward','composting','trading_type','shop_type','grade','terrace_farming_help_type','service','complaint','administration_type','waste_collection_interval','departments','labels_translations','item','association_type','office_type'];
var serviceName = "master";
server.start(serviceName, routes);
