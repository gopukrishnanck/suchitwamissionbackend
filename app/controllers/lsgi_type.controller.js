const Lsgitype = require('../models/lsgi_type');
module.exports = {
    //GET
    read: async(req, res, next) => {
       const nPerPage=3;
       const pageNumber= 0;
       var fields = ['name', 'id']
        try{
            const data= await Lsgitype.find({status:1},fields).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage
                );
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await Lsgitype.findById(req.params.id);
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newLsgi = new Lsgitype({
            name: req.body.name,
            sort_order: req.body.sort_order,
            status : req.body.status,
            created_at :Date.now(),
            modified_at: Date.now()
        });
        Lsgitype.addLsgi(newLsgi, (err, state) => {
            if (err) {
 
                res.json({ success: false, msg: 'Failed to register'});
            } else {
           
                res.json({ success: true, msg: 'registered'});
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        Lsgitype.findByIdAndUpdate(req.params.id,
            {$set:{      name: req.body.name,
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
            const removeData = await Lsgitype.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



