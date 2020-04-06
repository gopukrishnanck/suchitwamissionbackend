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
            res.send(data);
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



