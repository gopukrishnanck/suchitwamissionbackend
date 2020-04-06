const User = require('../models/userblockteam');
const bcrypt = require('bcryptjs');

module.exports = {
    //GET
    read: async(req, res, next) => {
        var nPerPage=parseInt(req.query.nPerPage,10);
        var pageNumber= parseInt(req.query.pageNumber,10);

        try{
            //database length
            const dblength =await User.countDocuments();
            console.log(dblength);
            // var sortBysurve = {officename:1};
            //fetch data
            const data= await User.find().skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage );
            
            //Find Total Pages
            const totalpages=Math.ceil(dblength/nPerPage);

            
            res.send({
                success: 1,
                items:data,
                totalpages: parseInt(totalpages,10),
                nPerPage:nPerPage,
                pageNumber:pageNumber
                
            });
            } catch(err){
                res.send({'message':err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await User.findById(req.params.id);
            res.send(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //PasswordUpdate
    passwordupdate:(req,res,next)=>{
        var password = req.body.password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
                    req.body.password = hash;

     User.findByIdAndUpdate(req.params.id ,{$set:req.body},{new:true},(err,data)=>{
              if(!err){
             return res.send({success:true, message:'succesful'});
              } else{
             return res.send({success:false, message:'error' + err});
      } })
      });     

    });

    },



    //POST
    create:(req, res, next) => {
        let newUser = new User(req.body);
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.send({ success: false, msg: 'Failed to register user' });
            } else {
                res.send({ success: true, msg: 'User registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        User.findByIdAndUpdate(req.params.id,
            {$set:req.body
            }, {new:true},
            (err,data)=>{
                     if(!err)
                     {
                        res.send({ success: true, msg: 'State Updated ok..!' });
                     }
                     else {
                        res.send({ success: false, msg: 'Failed to Update state', err});
                   }   
                });

    },
    //DELETE
    delete: async(req,res,next)=>{
        try {
            const removeData = await User.findByIdAndDelete(req.params.id);
            res.json(removeData);
                }catch(err){
                    res.json({message:err})
                }
    }

};



