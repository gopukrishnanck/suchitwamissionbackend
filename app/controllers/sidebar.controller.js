const SideBar = require('../models/sidebar');
module.exports = {
    //GET
    read: async(req, res, next) => {

const exp = req.identity.exp;



    //    const nPerPage=3;
    //    const pageNumber= 0;
    //    var fields = ['name', 'id']
        try{
            const data= await SideBar.find()
            res.send({
                success:1,
                items:data,    
            
            });
            // res.json(data);
            } catch(err){
                res.send({message:err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await SideBar.findById(req.params.id);
            res.send(data);
            } catch(err){
                res.send({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newSideBar = new SideBar(
           req.body
        );
        SideBar.addSidebar(newSideBar, (err, state) => {
            if (err) {
               
                res.send({ success: false, msg: 'Failed to register ' });
            } else {
               
                res.send({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    // update:(req,res,next)=>{
    //     SideBar.findByIdAndUpdate(req.params.id,
    //         {$set:{      menu_name: req.body.menu_name,
    //             menu_link: req.body.menu_link,
    //             parent_menu_id:req.body.parent_menu_id,
    //             icon:req.body.icon,
    //             sub_menu1:req.body.sub_menu1,
    //             sub_menu2:req.body.sub_menu2,
    //             sub_menu3:req.body.sub_menu3,

               
    //            }
    //         }, {new:true},
    //         (err,data)=>{
    //                  if(!err)
    //                  {
    //                     res.json({ success: true, msg: ' Updated ok..!' });
    //                  }
    //                  else {
    //                     res.json({ success: false, msg: 'Failed to Update ', err});
    //                }   
    //             });

    // },
    //DELETE
    delete: async(req,res,next)=>{
        try {
            const removeData = await SideBar.findByIdAndRemove(req.params.id)
            res.send(removeData);
                }catch(err){
                    res.send(err)
                }
    }

};



// {
//     "success": 1,
//     "imageBase":"https://images.unsplash.com/",

//     "items": [
//         {
//             "image":"photo-1558981033-f5e2ddd9c57e",
            
//             "name": "ddasda",
//             "sort_order": 1,
//             "__v": 0,
//             "id": "5e79e9fd0543132dccb64e49"
//         },
//         {
//             "image":"photo-1558981033-f5e2ddd9c57e",
//             "name": "jaiva",
//             "sort_order": 1,
//             "__v": 0,
//             "id": "5e79dff90543132dccb64e48"
//         },
//         {
//             "image":"photo-1558981033-f5e2ddd9c57e",
//             "name": "kambost waste",
//             "sort_order": 1,
//             "__v": 0,
//             "id": "5e79cceef0e3ea170c1ec616"
//         }
//     ],
//     "totalpages": null,
//     "nPerPage": null,
//     "pageNumber": null
// }