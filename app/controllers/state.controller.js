const State = require('../models/state');
module.exports = {
    //GET
    read: async(req, res, next) => {
        const nPerPage=3;
        const pageNumber= 0
        var  field = ['name', 'id'];
        try{
            const data= await State.find({status:1},field).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage
                );
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await State.findById({_id:req.params.id});
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let newState = new State({
            name: req.body.name,
            code: req.body.code,
            sort_order: req.body.sort_order,
            status:req.body.status,
            created_at:Date.now(),
            modified_at:Date.now()

            
        });
        State.addState(newState, (err, state) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register state' });
            } else {
                res.json({ success: true, msg: 'State registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        State.findByIdAndUpdate(req.params.id,
            {$set:{       name : req.body.name,
                         code  : req.body.code,
                        status : req.body.status,
                    sort_order : req.body.sort_order,
                   modified_at : Date.now()
                 }
            }, {new:true},
            (err,data)=>{
                     if(!err)
                     {
                        res.json({ success: true, msg: 'State Updated ok..!' });
                     }
                     else {
                        res.json({ success: false, msg: 'Failed to Update state', err});
                   }   
                });

    },
    //DELETE
    delete: async(req,res,next)=>{
        try {
            const removeData = await State.remove({_id:req.params.id});
            res.json(removeData);
                }catch(err){
                    res.json({message:err})
                }
    }

};



