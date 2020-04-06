const category = require('../models/sub_category');
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
            var sortByName ={name:1}

            const totalItems = await category.countDocuments();

            
            const data= await category.find().sort(sortByName).populate(['category_id']).skip(page > 0 ? ( ( page - 1 ) * per_page ) : 0).limit(per_page );
         
            const total_pages =  Math.ceil(totalItems/per_page);
            res.send({
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
            const data= await category.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newSub = new category(req.body);
        newSub.category_id= new mongoose.Types.ObjectId(newSub.category_id)
        category.addSub(newSub, (err, state) => {
            if (err) {
                //res.json(err)
                res.json({ success: false, msg: 'Failed  ' });
            } else {
               // res.json(state)
                res.json({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        category.findByIdAndUpdate(req.params.id,
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
            const removeData = await category.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



