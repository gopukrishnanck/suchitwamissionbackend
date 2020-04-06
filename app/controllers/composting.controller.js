const departments = require('../models/composting');
var url = require('url');
const mongoose = require('mongoose');

const querystring = require('querystring');
module.exports = {
    //GET
    read: async(req, res, next) => {
        // const url = require('url').parse(req.url,true).query;    
       var  per_page= parseInt(req.query.per_page,10);
      var    page= parseInt(req.query.page,10);
  
    //    console.log(req.query)
     // var parsed = url.parse();

    //console.log(parsed);
    //    console.log(req.params.pageNumber);

    //   var  fields = ['name','id'];
    
      try{
            console.log(per_page);
            console.log(page);
            // var sortByName ={name:1}

            const totalItems = await departments.countDocuments();

            
            const data= await departments.find().populate(['category_id','category_relationship_id']).skip(page > 0 ? ( ( page - 1 ) * per_page ) : 0).limit(per_page );
         
            const total_pages =  Math.ceil(totalItems/per_page);
            res.send({
                imageBase :"https://images.unsplash.com/",
                success:1,
                items:data,
                total_pages:total_pages,
                per_page:per_page,
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
            const data= await departments.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        console.log(req.body);
        
        let  newcom = new departments(req.body);
        newcom.category_id= new mongoose.Types.ObjectId(newcom.category_id);
        newcom.category_relationship_id= new mongoose.Types.ObjectId(newcom.category_relationship_id);

        departments.addcom(newcom, (err, state) => {
            if (err) {
                //res.json(err)
                res.json({ success: false, msg: 'Failed to register ' });
            } else {
               // res.json(state)
                res.json({ success: true, msg: ' registered' });
                console.log(err);
                
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        departments.findByIdAndUpdate(req.params.id,
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
            const removeData = await departments.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



