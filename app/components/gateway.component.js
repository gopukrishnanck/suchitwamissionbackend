const superagent = require('superagent');
var config = require('../../config/app.config.js');
var gatewayUrl = config.gateway.url; 
module.exports = {
    
    get: function(path,params,callback) {
        /**
         * 
        */
        var url = gatewayUrl + path;
        console.log("Routing path "+url +" through gateway");
        superagent.get(url).query(params).end((err,res)=> { 
            callback(err,res.body);
        }); 
    }    
}
 