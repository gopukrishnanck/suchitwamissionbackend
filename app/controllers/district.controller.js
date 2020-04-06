const District = require('../models/district');
module.exports = {
    //GET
    read: async(req, res, next) => {
       const nPerPage=3;
       const pageNumber= 0
      var  fields = ['name','id'];
        try{
            const data= await District.find({status:1},fields).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage
                );
            res.json(data)
            } catch(err){
                res.json({message:err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await District.findById(req.params.id).populate('state','name','state_id')
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newDistrict = new District({
            name: req.body.name,
            state_id:req.body.state_id,
            sort_order: req.body.sort_order,
            status : req.body.status,
            created_at :Date.now(),
            modified_at: Date.now()
        });
        District.addDistrict(newDistrict, (err, state) => {
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
        District.findByIdAndUpdate(req.params.id,
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
            const removeData = await District.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



