const Question = require('../models/question');
module.exports = {
    //GET
    read: async(req, res, next) => {
        var nPerPage=parseInt(req.query.nPerPage,10);
        var pageNumber= parseInt(req.query.pageNumber,10);

        try{
            //database length
            const dblength =await Question.countDocuments();
            console.log(dblength);
           
            //fetch data
            const data= await Question.find().skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage );
            
            //Find Total Pages
            const totalpages=Math.ceil(dblength/nPerPage);

            
            res.send({
                success: 1,
                items:data,
                totalpages: parseInt(totalpages,10),
                nPerPage:nPerPage,
                pageNumber:pageNumber,
                totalitems:dblength
            });
            } catch(err){
                res.send({'message':err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await Question.findById(req.params.id);
            res.send(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let newData = new Question(req.body);
        console.log(req.body);
        Question.addData(newData, (err, data) => {
           
            if (err) {
                res.send({ success: false, msg: 'Failed to register Data'+ err });
            } else {
                res.send({ success: true, msg: 'Data registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        Question.findByIdAndUpdate(req.params.id,
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
            const removeData = await Question.findByIdAndDelete(req.params.id);
            res.json(removeData);
                }catch(err){
                    res.json({message:err})
                }
    }

};



