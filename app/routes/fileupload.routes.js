var crypto = require('crypto');
var multer = require('multer');
var mime = require('mime-types');

module.exports = (app,methods) => {

//Store and validation
const multerConfig = {
    storage : multer.diskStorage({
        destination : function(req,file,next){
            next(null,'./public/images');
        },
        filename: function(req,file,next){
            crypto.pseudoRandomBytes(16, function (err, raw) {
                           if (err)
                                return next(err)
                            next(null, raw.toString('hex') + "." + mime.extension(file.mimetype))
                       })
        }
    })
};

    console.log(methods,'methods')
    const fileupload = methods.loadController('fileupload'); 
    flUpload = multer(multerConfig).fields([{ name: 'images', maxCount: 10 }, { name: 'documents', maxCount: 10 }, { name: 'video', maxCount: 1 }]);
    fileupload.methods.post('fileupload',fileupload.fileUpload,{auth:true },flUpload);
}



