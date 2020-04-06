const UserWms = require('../models/wms');

module.exports = {
    fileUpload : function (req, res) {
    
        if (req.files['images']) {
           
        async function update() {
            try {
                    await UserWms.updateOne({ username: req.identity.username },
                           {
                            $set: { "img":req.files['images'][0].path }
                       },{upsert:true});
                      res.json({ 'message': 'Images uploaded successfully' });
            } catch (e) { }
        } update();
   
}
        if (req.files['documents']) {
        async function update() {
            try {
                    await UserWms.updateOne({ username: req.identity.username },
                           {
                            $set: { "doc": req.files['documents'][0].path }
                       },{upsert:true});
                      res.json({ 'message': 'documents uploaded successfully' });
            } catch (e) { }
        } update();
    }
        if (req.files['video']) {
        async function update() {
            try {
                    await UserWms.updateOne({ username: req.identity.username },
                           {
                            $set: { "vid": req.files['video'][0].path }
                       },{upsert:true});
                      res.json({ 'message': 'video uploaded successfully' });
            } catch (e) { }
        } update();
    }
     
    // check for Image
    if (req.files['images']) {
        console.log(req.files['images'][0]);
        //store file in body
        req.body.images = req.files['images'][0].filename;
    }
     // check for Document
     if (req.files['documents']) {
        console.log(req.files['documents'][0]);
        // //store file in body
        // req.body.documents = req.files['documents'][0].filename;
    }
     // check for Video
     if (req.files['video']) {
        console.log(req.files['video'][0]);
        // //store file in body
        // req.body.video = req.files['video'][0].filename;
    }
    
}
};









