const District = require('../models/ward');
var url = require('url')

const querystring = require('querystring');
module.exports = {
    //GET
    read: async(req, res, next) => {
        // const url = require('url').parse(req.url,true).query;    
       var  per_page= parseInt(req.query.per_page,10);
      var    page= parseInt(req.query.page,10);
  
    //    console.log(req.query)
     // var parsed = url.parse();

    //console.log(parsed);
    //    console.log(req.params.pageNumber);

    //   var  fields = ['name','id'];
    
      try{
            // console.log(nPerPage);
   // console.log(District);
            
   //     console.log(District.length)
   

   const totalItems = await District.countDocuments();
   var sortByName = {name_el: 1};
//   var quar = {name:req.body.name}

            const data= await District.find().sort(sortByName).skip(page > 0 ? ( ( page - 1 ) * per_page ) : 0).limit(per_page );
//    const filt=[];
            // var name2 = req.query.name;
            // console.log(name2);     
            // data.filter(a=>{
            //     console.log(a.name);
                
            //     if(a.name == name2){
            // //    filt=a;
            // //    console.log(filt);
               
                    
            //         //  data=a;
            //         //  console.log(data);
                     
            //     }
            // })
           
                
              
               

               
               
                
                
              
            




            // data.filter(a=>a.name=quar)
                
            // const match = {}
            // if(req.query.name){
            //     data.name = req.query.name
            // console.log(data);}
            
                //     if(name == req.query.name){
                //    data.filter(name)
                //     }
//               var quer = {name:req.query.name}
//             const arr1 = data.filter(d => d.req.query);
// console.log('arr1', arr1);
// b = req.query.name
// console.log(b);

   

            // console.log(data);
            //  for(let i=0;i< data.keys(data).length;i++){
            //     data['item'][i]['sl_no']=i;

            //  }
            //  console.log( data['item'][3]['sl_no']);
            //             const length1 = Object.keys(data).length
//    console.log(length1);
         const total_pages =  Math.ceil(totalItems/per_page);
         

       

            res.send({
                success:1,
                items:data,
               total_pages:total_pages,
               per_page:per_page,
               page:page
                // x: parseInt(District.length)
            })
            // console.log(data)
    
            
            } catch(err){
                res.json(err);
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await District.findById(req.params.id)
         
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newWard = new District(req.body);
        District.addWard(newWard, (err, state) => {
            if (err) {
                //res.json(err)
                res.json({ success: false, msg: 'Failed to register ' });
            } else {
               // res.json(state)
                res.json({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        District.findByIdAndUpdate(req.params.id,
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
            const removeData = await District.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



