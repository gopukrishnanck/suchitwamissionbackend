const settings = require('../models/settings');
var url = require('url')

const querystring = require('querystring');
module.exports = {
    //GET
    read: async(req, res, next) => {
        // const url = require('url').parse(req.url,true).query;    
       var  nPerPage= parseInt(req.query.nPerPage,10);
      var    pageNumber= parseInt(req.query.pageNumber,10);
  
    //    console.log(req.query)
     // var parsed = url.parse();

    //console.log(parsed);
    //    console.log(req.params.pageNumber);

    //   var  fields = ['name','id'];
    
      try{
            console.log(nPerPage);
            console.log(pageNumber);
            var sortByName ={title:1,email:1}

            const totalItems = await settings.countDocuments();

            
            const data= await settings.find().sort(sortByName).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage );
         
            const totalpages =  Math.ceil(totalItems/nPerPage);
            res.send({
                success:1,
                items:data,
                totalpages:totalpages,
                nPerPage:nPerPage,
                pageNumber:pageNumber,
                totalItems:totalItems
                // x: parseInt(District.length)
            })
        
    
            
            } catch(err){
                res.json(err);
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await settings.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newSetting = new settings(req.body);
        settings.addSetting(newSetting, (err, state) => {
            if (err) {
                //res.json(err)
                res.json({ success: false, msg: 'Failed to register ' });
            } else {
               // res.json(state)
                res.json({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        settings.findByIdAndUpdate(req.params.id,
            {$set: req.body
            }, {new:true},
            (err,data)=>{
                     if(!err)
                     {
                        res.json({ success: true, msg: ' Updated ok..!' });
                     }
                     else {
                        res.json({ success: false, msg: 'Failed to Update ', err});
                   }   
                });

    },
    //DELETE
    delete: async(req,res,next)=>{
        try {
            const removeData = await settings.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



