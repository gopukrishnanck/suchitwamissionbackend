const Question = require('../models/survey_app_auestions');
module.exports = {
    //GET
    read: async(req, res, next) => {
        var per_page=parseInt(req.query.per_page,10);
        var page= parseInt(req.query.page,10);

        try{
            //database length
            const dblength =await Question.countDocuments();
            console.log(dblength);
            var sortByName ={question_en:1}
           
            //fetch data
            const data= await Question.find().sort(sortByName).skip(page > 0 ? ( ( page - 1 ) * per_page ) : 0).limit(per_page );
            
            //Find Total Pages
            const total_pages=Math.ceil(dblength/per_page);

            
            res.send({
                success: 1,
                items:data,
                total_pages: parseInt(total_pages,10),
                per_page:per_page,
                page:page,
               
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



