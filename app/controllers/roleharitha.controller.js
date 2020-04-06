const Role = require('../models/roleharitha');
module.exports = {
    //GET
    read: async(req, res, next) => {
         try{
            //database length
            const dblength =await Role.countDocuments();
            console.log(dblength);
           
            //fetch data
            const data= await Role.find();
            
            res.send({
                success: 1,
                items:data,
                totalitems:dblength
            });
            } catch(err){
                res.send({'message':err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await Role.findById(req.params.id);
            res.send(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let newData = new Role(req.body);
        console.log(req.body);
        Role.addData(newData, (err, data) => {
           
            if (err) {
                res.send({ success: false, msg: 'Failed to register Data'+ err });
            } else {
                res.send({ success: true,data:data, msg: 'Data registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        console.log(req.body);
       const id= req.params.id;
       Role.findByIdAndUpdate(id,
            {$set:req.body
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
            const removeData = await Role.findByIdAndDelete(req.params.id);
            res.json(removeData);
                }catch(err){
                    res.json({message:err})
                }
    }

};



