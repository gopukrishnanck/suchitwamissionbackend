const Lsgi = require('../models/lsgi');
module.exports = {
    //GET
    read: async(req, res, next) => {
       const nPerPage=3;
       const pageNumber= 0;
       var fields = ['name', 'id']
        try{
            const data= await Lsgi.find({status:1},fields).skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0).limit(nPerPage
                );
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //GET
    readeach: async(req, res, next) => {
        try{
            const data= await Lsgi.findById(req.params.id);
            res.json(data);
            } catch(err){
                res.json({message:err});
            }
    },
    //POST
    create: (req,res,next)=>{
        let  newLsgi = new Lsgi({
            name: req.body.name,
            block_id:req.body.block_id,
            lsgi_type_id:req.body.lsgi_type_id,
            image_id:req.body.image_id,
            address:req.body.address,
            code:req.body.code,
            sort_order:req.body.sort_order,
            default_service_rate:req.body.default_service_rate,
            default_complaint_rate:req.body.default_complaint_rate,
            is_camera_surveillance_required:req.body.is_camera_surveillance_required,
            is_wastemanagement_required:req.body.is_wastemanagement_required,
            service_assigment_expiry_hours:req.body.service_assigment_expiry_hours,
            rating_calculation_interval_hours:req.body.rating_calculation_interval_hours,
            complaints_count_rating_calculation_interval_hours:req.body.complaints_count_rating_calculation_interval_hours,
            default_service_point:req.body.default_service_point,
            header_image_id:req.body.header_image_id,
            footer_image_id:req.body.footer_image_id,
            default_slab_rate:req.body.default_slab_rate,
            camera_fault_calculation_interval_hours:req.body.camera_fault_calculation_interval_hours,
            gst_no:req.body.gst_no,
            cgst_percentage:req.body.cgst_percentage,
            sgst_percentage:req.body.sgst_percentage,
            status : req.body.status,
            created_at :Date.now(),
            modified_at: Date.now()
        });
        Lsgi.addLsgi(newLsgi, (err, state) => {
            if (err) {
            
                res.json({ success: false, msg: 'Failed to register ' });
            } else {
               
                res.json({ success: true, msg: ' registered' });
            }
        });
    },
    //PUT
    update:(req,res,next)=>{
        Lsgi.findByIdAndUpdate(req.params.id,
               {$set:{  
               name: req.body.name,
                block_id:req.body.block_id,
                lsgi_type_id:req.body.lsgi_type_id,
                image_id:req.body.image_id,
                address:req.body.address,
                code:req.body.code,
                sort_order:req.body.sort_order,
                default_service_rate:req.body.default_service_rate,
                default_complaint_rate:req.body.default_complaint_rate,
                is_camera_surveillance_required:req.body.is_camera_surveillance_required,
                is_wastemanagement_required:req.body.is_wastemanagement_required,
                service_assigment_expiry_hours:req.body.service_assigment_expiry_hours,
                rating_calculation_interval_hours:req.body.rating_calculation_interval_hours,
                complaints_count_rating_calculation_interval_hours:req.body.complaints_count_rating_calculation_interval_hours,
                default_service_point:req.body.default_service_point,
                header_image_id:req.body.header_image_id,
                footer_image_id:req.body.footer_image_id,
                default_slab_rate:req.body.default_slab_rate,
                camera_fault_calculation_interval_hours:req.body.camera_fault_calculation_interval_hours,
                gst_no:req.body.gst_no,
                cgst_percentage:req.body.cgst_percentage,
                sgst_percentage:req.body.sgst_percentage,
                status : req.body.status,
                modified_at: Date.now()
            }
            }, {new:true},
            (err,data)=>{
                     if(!err)
                     {
                        res.json({ success: true, msg: 'Updated ok..!' });
                     }
                     else {
                        res.json({ success: false, msg: 'Failed to Update ', err});
                   }   
                });

    },
    //DELETE
    delete: async(req,res,next)=>{
        try {
            const removeData = await Lsgi.findByIdAndRemove(req.params.id)
            res.json(removeData);
                }catch(err){
                    res.json(err)
                }
    }

};



