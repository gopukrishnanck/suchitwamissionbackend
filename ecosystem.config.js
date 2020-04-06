module.exports={
    apps:[
        {
            "name":"suchitwamission backend Authenticate Service",
            "script":"authenticate.service.js",
            "env":{
                "NODE_ENV":"development",
                "port":"3001"
            }
        },
        {
            "name":"suchitwamission backend masters Service",
            "script":"masters.service.js",
            "env":{
                "NODE_ENV":"development",
                "port":"3002"
            }
        },
        {
            "name":"suchitwamission sidebar Service",
            "script":"sidebar.service.js",
            "env":{
                "NODE_ENV":"development",
                "port":"3003"
            }
        },
        {
            "name":"suchitwamission EditUser Service",
            "script":"editUser.service.js",
            "env":{
                "NODE_ENV":"development",
                "port":"3004"
            }
        }
    ]
    ,
//    deploy: {
//     development: {
//       host: '172.104.61.150',
//       user: 'root',
//       ref: 'origin/master', // (use 'origin/master' for your master branch,
//       repo: "https://github.com/hilaltrois/covid19-backnd.git", // your repo url
//       path: "/opt/trois/covid19-backnd",
//       "post-deploy":
//         "npm install && pm2 reload ecosystem.config.js --env development && pm2 save"
//     }
//   }
}
