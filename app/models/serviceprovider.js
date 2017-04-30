// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var serviceproviderSchema = mongoose.Schema({

  email: String,
  password: String,
  username : String,
  serviceId: String,
  complaints : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'complaint'
  }]


//   password: String,
//   email: String,
//   service: String,
//     complaints : [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref : 'complaint'
//     }]


});

// methods ======================
// generating a hash
serviceproviderSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
serviceproviderSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('ServiceProvider', serviceproviderSchema);
