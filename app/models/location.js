var mongoose = require('mongoose');

var locationSchema = mongoose.Schema ({


  location:{
      type:String,
      required:true,
      unique:true
  }

});

module.exports = mongoose.model("location", locationSchema);
