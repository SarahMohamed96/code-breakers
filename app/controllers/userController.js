let User = require('../models/user');



let userController  = {

  updateUser: function(req, res) {

    var username = req.body.email;
    var password = req.body.password;
    var userId = req.user._id;

      User.findById(userId, function (err, userData){
          var user = userData;
          var oldusername = user.local.username;
          var oldpassword = user.local.password;
          if (username != ""  && password != "")
          {
            user.local.username = username;
            user.local.password = password;
          }
          else if (username != "" && password == "")
          {
            user.local.username = username;
            user.local.password = oldpassword;

          }
          else if
          (username == "" && password != "")
          {
            user.local.username = oldusername;
            user.local.password = password;
          }


          user.save(function(err,user){
              if (err){
                  res.send(err.message)
              
              } else {
                  console.log("success");
                  console.log(user);
                  res.redirect('profile');
              }
          })
      });

    },

}

module.exports = userController;
