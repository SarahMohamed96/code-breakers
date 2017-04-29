let Complaint = require('../models/complaint.js');


let ComplaintController  = {
  createComplaint: function(req, res){

    let complaint = new Complaint(req.body);

    complaint.save(function(err, complaint){
        if(err){
            res.send(err.message)
            console.log(err);
        }
        else{
            console.log(complaint);
            
        }
    })
  },

}

module.exports = ComplaintController;
