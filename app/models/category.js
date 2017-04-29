var mongoose = require('mongoose');

var categorySchema = mongoose.Schema ({

  //db.collection.insert({"category" : ["1", "2","3]})
  name:{
      type:String,
      required:true,
      unique:true
  }

});

module.exports = mongoose.model("category", categorySchema);
