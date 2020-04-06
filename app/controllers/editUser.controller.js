const editUser = require('../models/wms');
const bcrypt = require('bcryptjs');
module.exports = {
    
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await editUser.findById({_id:req.identity._id});
            res.send(data);
            } catch(err){
                res.send({message:err});
            }
    },
    passwordupdate:(req,res,next)=>{
        var password = req.body.password

        editUser.comparePassword(password, req.identity.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
                    req.body.password = hash;

     editUser.findByIdAndUpdate({_id:req.identity._id} ,req.body,(err,data)=>{
              if(!err){
             return res.send({success:true, message:'succesful'});
              } else{
             return res.send({success:false, message:'error' + err});
      } })
      });     

    });
}})

    },

    //PUT

    update:(req,res,next)=>{

    editUser.findByIdAndUpdate({_id:req.identity._id} ,req.body,(err,data)=>{
              if(!err){
             return res.send({success:true, message:'succesful'});
              } else{
             return res.send({success:false, message:'error' + err});
      } })
      }








      
        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(req.body.password, salt, (err, hash) => {
        //       if (err) throw err;
        //             req.body.password = hash;
            
        // //     });
        // // });
        // editUser.findByIdAndUpdate(req.identity._id,
        //     {$set:{     
        //     //    username:req.body.username,
        //     //    password:req.body.password,
        //     //    role:req.body.role
        //       }
        //     }, {new:true},
        //     (err,data)=>{
        //              if(!err)
        //              {
        //                 res.send({ success: true, msg: ' Updated ok..!' });
        //              }
        //              else {
        //                 res.send({ success: false, msg: 'Failed to Update ', err});
        //            }   
        //         });
            
    

}