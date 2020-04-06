const Survey = require('../models/surveyresultharitha');
module.exports = {
    //GET
    read: async(req, res, next) => {
        var nPerPage=parseInt(req.query.nPerPage,10);
        var pageNumber= parseInt(req.query.pageNumber,10);

        try{
            //database length
            const dblength =await Survey.countDocuments();
            console.log(dblength);
            // var sortBysurve = {officename:1};
            //fetch data
            const data= await Survey.find().skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage );
            
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
            const data= await Survey.findById(req.params.id);
            res.send(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let newData = new Survey(req.body);
        Survey.addData(newData, (err, data) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register Data' });
            } else {
                res.json({ success: true, msg: 'Data registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        Survey.findByIdAndUpdate(req.params.id,
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
            const removeData = await Survey.remove({id:req.params.id});
            res.json(removeData);
                }catch(err){
                    res.json({message:err})
                }
    }

};



