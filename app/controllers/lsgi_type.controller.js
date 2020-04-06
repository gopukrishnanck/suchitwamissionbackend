const lsgi_type = require('../models/lsgi_type');
var url = require('url')

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

            const total_items = await lsgi_type.countDocuments();
            var sortByName ={name:1}
            
            const data= await lsgi_type.find().sort(sortByName).skip(page > 0 ? ( ( page - 1 ) * per_page ) : 0).limit(per_page );
         
            const total_pages =  Math.ceil(total_items/per_page);

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
            const data= await lsgi_type.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newLsgi = new lsgi_type(req.body);
        lsgi_type.addLsgi(newLsgi, (err, state) => {
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
        lsgi_type.findByIdAndUpdate(req.params.id,
            {$set:{      name: req.body.name,
                state_id: req.body.state_id,
                sort_order: req.body.sort_order,
                status : req.body.status,
               
                modified_at: Date.now()}
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
            const removeData = await lsgi_type.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



