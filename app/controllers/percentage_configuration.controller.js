const percentage = require('../models/percentage_configuration');
var url = require('url')

const querystring = require('querystring');
module.exports = {
    //GET
    read: async(req, res, next) => {
        // const url = require('url').parse(req.url,true).query;    
       var  perPage= parseInt(req.query.perPage,10);
      var    page= parseInt(req.query.page,10);
  
    //    console.log(req.query)
     // var parsed = url.parse();

    //console.log(parsed);
    //    console.log(req.params.pageNumber);

    //   var  fields = ['name','id'];
    
      try{
            console.log(perPage);
            console.log(page);
            var sortByName ={name:1,grade:1}

            const totalItems = await percentage.countDocuments();

            
            const data= await percentage.find().sort(sortByName).skip(page > 0 ? ( ( page - 1 ) * perPage ) : 0).limit(perPage );
         
            const totalPages =  Math.ceil(totalItems/perPage);
            res.send({
                success:1,
                items:data,
                totalPages:totalPages,
                perPage:perPage,
                page:page
                // x: parseInt(District.length)
            })
        
    
            
            } catch(err){
                res.json(err);
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await percentage.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newPercentage = new percentage(req.body);
        percentage.addnewPercentage(newPercentage, (err, state) => {
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
        percentage.findByIdAndUpdate(req.params.id,
            {$set:req.body
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
            const removeData = await percentage.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



