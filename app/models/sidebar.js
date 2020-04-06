const mongoose = require('mongoose');
function transform(doc,ret){
    var id = doc._id;
    delete ret._id;
    ret.id = id;
  }
  var params =  {
    toObject: {
      transform: transform
    },
    toJSON: {
      transform: transform
    }
  };

//User Schema
const SideBarSchema = mongoose.Schema({

    menu_name:String,
    menu_link: String,
    parent_menu_id: Number,
    icon:String,
    sub_menu:[{
        // parent_menu_id: {
        //     type: mongoose.Schema.Types.ObjectId
        // },
             sub_menu_name:String,
             sub_menu_link: String,
             icon:String
    },{  sub_menu_name:String,
             sub_menu_link: String,
    },{
             sub_menu_name:String,
             sub_menu_link: String   
    }],
    class:String
},params);


module.exports = mongoose.model('sidebar', SideBarSchema);


module.exports.addSidebar = function (newSideBar, callback) {
    newSideBar.save(callback);
  };
