let Review = require('../models/review.js');
let Service = require('../models/service');

let ReviewController  = {


  createReview: function(req, res){

    console.log("fmckjsnmfkjskf");
    console.log(req.body.serviceID);

    let review = new Review(req.body);

      Service.findById(req.body.serviceID,function(err, service){
        console.log(service);
         review.serviceid = service._id;

      review.save(function(err, review){
        if(err){
            res.send(err.message)
            console.log(err);
        }
        else{
            console.log(review);

        }
    })

 });





  },


   getAllReviews:function(req,res){
    console.log("bcwjhbcjwvj");
    console.log(req.body.serviceID);

    Review.find({serviceid: req.body.serviceID}, function(err, reviews) {
    console.log(reviews);
    //review.serviceName = service.serviceName;
    if(err)
      res.send(err.message)
    else
      res.json(reviews);

    });

  }


}

module.exports = ReviewController;
