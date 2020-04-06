const Ward = require('../models/ward');
module.exports = {
    //GET
    read: async(req, res, next) => {
       const nPerPage=3;
       const pageNumber= 0;
       var  fields = ['name','id'];

        try{
            const data= await Ward.find({status:1},fields).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage
                );
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await Ward.findById(req.params.id);
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newWard = new Ward({
            name: req.body.name,
            code:req.body.code,
            lsgi_id:req.body.lsgi_id,
            ward_no:req.body.ward_no,
            name_en:req.body.name_en,
            sort_order: req.body.sort_order,
            status : req.body.status,
            created_at :Date.now(),
            modified_at: Date.now()
        });
        Ward.addWard(newWard, (err, state) => {
            if (err) {
                // res.json(err)
                res.json({ success: false, msg: 'Failed to register' });
            } else {
                // res.json(state)
                res.json({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        Ward.findByIdAndUpdate(req.params.id,
            {$set:{      name: req.body.name,
                code:req.body.code,
                lsgi_id:req.body.lsgi_id,
                ward_no:req.body.ward_no,
                name_en:req.body.name_en,
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
            const removeData = await Ward.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



