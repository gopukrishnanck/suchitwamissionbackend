const LSGI = require('../models/lsgi');
var url = require('url')
const mongoose = require('mongoose')

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
            // console.log(nPerPage);
            // console.log(pageNumber);
            var sortByName ={name:1,district:1}

            const totalItems = await LSGI.countDocuments();
            
            const data= await LSGI.find().sort(sortByName).populate(['district_id','lsgi_type_id']).skip(page > 0 ? ( ( page - 1 ) * per_page ) : 0).limit(per_page );
         
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
            const data= await LSGI.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newLSGI = new LSGI(req.body);
        newLSGI.district_id = new mongoose.Types.ObjectId(newLSGI.district_id);
        newLSGI.lsgi_type_id = new mongoose.Types.ObjectId(newLSGI.lsgi_type_id);

        LSGI.addnewLSGI(newLSGI, (err, state) => {
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
        
        LSGI.findByIdAndUpdate(req.params.id,
           
            {$set:req.body
            }, {new:true},
            (err,data)=>{
                     if(!err)
                     {
                        res.json({ success: true, msg: ' Updated ok..!' });
                     }
                     else {
                        LSGI.district_id=new mongoose.Types.ObjectId(LSGI.district_id);
                        res.json({ success: false, msg: 'Failed to Update ', err});
                   }   
                });

    },
    //DELETE
    delete: async(req,res,next)=>{
        try {
            const removeData = await LSGI.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



