const category = require('../models/category');
var url = require('url')

const querystring = require('querystring');
module.exports = {
    //GET
    read: async(req, res, next) => {
        // const url = require('url').parse(req.url,true).query;    
       var  nPerPage= parseInt(req.query.nPerPage,10);
      var    pageNumber= parseInt(req.query.pageNumber,10);
  
    //    console.log(req.query)
     // var parsed = url.parse();

    //console.log(parsed);
    //    console.log(req.params.pageNumber);

    //   var  fields = ['name','id'];
    
      try{
            console.log(nPerPage);
            console.log(pageNumber);
            var sortByName ={name:1}

            const totalItems = await category.countDocuments();

            
            const data= await category.find().sort(sortByName).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage );
         
            const totalpages =  Math.ceil(totalItems/nPerPage);
            res.send({
                imageBase :"https://images.unsplash.com/", 
                success:1,
                items:data,
                totalpages:totalpages,
                nPerPage:nPerPage,
                pageNumber:pageNumber
                // x: parseInt(District.length)
            })
        
    
            
            } catch(err){
                res.json(err);
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await category.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newCat = new category(req.body);
        category.addCat(newCat, (err, state) => {
            if (err) {
                //res.json(err)
                res.json({ success: false, msg: 'Failed  ' });
            } else {
               // res.json(state)
                res.json({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        category.findByIdAndUpdate(req.params.id,
            {$set:req.body
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
            const removeData = await category.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



