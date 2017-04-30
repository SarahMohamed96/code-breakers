let Service = require('../models/service');
var ServiceProvider = require ('../models/serviceprovider');

let serviceController = {

  createService: function(req, res){

    let service = new Service(req.body);
    service.rating = 0;

    service.save(function(err, service){
        if(err){
            res.send(err.message);
            console.log(err);
        }
        else{
            console.log(service);
//            res.json(service);
        }
    })
   ServiceProvider.findById(req.serviceProvider._id, function(err, sprovider) {

    sprovider.serviceId = service._id;



  })
  },


  updateService: function(req,res){
    var serviceName = req.body.serviceName;
    var description = req.body.description;
    var address = req.body.address;
    var price = req.body.price;
    var location = req.body.location;
    var category = req.body.category;
    var workingdays = req.body.workingdays;
    var beginWorkingHours = req.body.beginWorkingHours;
    var endWorkingHours = req.body.endWorkingHours;

    //ServiceProvider.findById(req.serviceProvider._id, function(err, serviceprovider) {
//serviceprovider.serviceId

  Service.findById("59049a5ad2fabb16816e876b",function(err,service1){
    if(serviceName != ""){
      service1.serviceName = serviceName;
    }
    if (category != ""){

      service1.category = category;
    }
    if (price != ""){

      service1.price = price;
    }
    if (location != ""){
      service1.location = location;
    }
    if (workingdays != ""){
      service1.workingdays = workingdays;
    }
    if (beginWorkingHours != ""){
      service1.beginWorkingHours = beginWorkingHours;
    }
   if (endWorkingHours !=""){
     service1.endWorkingHours = endWorkingHours;
   }
   if(description != ""){
     service1.description = description;
   }
  if(address != ""){
      service1.address = address;
  }

    Service.changeService(service1,function(err){
      if (err){
        return console.error(err);
      }else{
        console.log("service is updated");
      }
    });
  });

},

deleteService: function (req, res){

  //serviceProvider.findById(req.serviceProvider._id,function(err,sprovider){
  //sProvider.serviceId
    Service.findById("5904853ea1b3010deae941b7",function(err,service1){
      Service.DeleteService(service1,function(err){
        if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + service1._id);
                    res.format({
                        //HTML returns us back to the main or success page
                          html: function(){
                               res.redirect("/");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : service1
                               });
                         }
                      });
                }

      });
    });


},

 deleteOffer: function(req, res){
    Service.findById({_id:req.body._id},function(err, service){
    service.update({
    offerDescription : "",
    currentOffer : false
    });

  console.log("Offer deleted successfully");

    });
  },

   offerCreate: function(req, res){
    console.log("djds");
    console.log(req.body.offerDescription);

    let offer = new Offer(req.body.offerDescription);
    Service.findById("58ecece7d51ba715431fd5ad",function(err, service){
      console.log(service);
      /*review.serviceid = service._id;*/
      service.offerDescription.save(function(err, offerDescription) {
        if(err){
          res.send(err.message)
          console.log(err);
        }
        else{
          console.log(offerDescription);
        }
      })
    })
   },



      getServiceByCategory:function(req, res){
        console.log(req.body);
        var Category = req.body.text;
        //console.log(Category.name);


        Service.find({category: Category}, function(err, services) {

              if(err)
                  res.send(err.message);
              else
                res.json(services);

      })

    },



      getServiceByLocation: function(req,res){
        console.log(req.body);
        var locationn = req.body.text;
        console.log(locationn.name);
        Service.find({location: locationn}, function(err, services){

        if (err)
           res.send(err.message)

        else
           res.json(services);

      })
    },

    getServiceByDate: function(req,res){


      console.log(req.body);
      Service.find(function(err, services){

      services.reverse();

      if (err)
       res.send(err.message)

      else
       res.json(services);

    })
  },

    getServiceByOffer : function(req,res){
    console.log(req.body);
     Service.find({currentOffers: true}, function(err, services){

     if (err)
      res.send(err.message)

     else
      res.json(services);

   })},

   getServiceByRating: function(req,res){
     console.log(req.body);

     Service.find(function(err, services){
       services.sort(function(a, b) {
     a = a.rating;
     b = b.rating;
     return a>b ? -1 : a<b ? 1 : 0;
       });
       console.log(services);

     if (err)
      res.send(err.message)

     else
      res.json(services);

   })

 },



getServiceByKeyword: function (req,res)
{

  console.log(req.body);
  if(req.body.text) {
		const regex = new RegExp(escapeRegex(req.body.text), 'gi');
		Service.find({"serviceName": regex}, function(err, services) {
			if(err) {
				res.send(err.message);
			}  else {
        console.log(services);
        res.json(services);

			}
		});


   } else {
  Service.find(function(err, services){

      if(err)
          res.send(err.message);
      else
          res.json(services);
  })

}

},

 getAllServices:function(req, res){

        Service.find(function(err, services){

            if(err)
                res.send(err.message);
            else
                res.json(services);
        })
    },

    getDetails: function(req, res){
      Service.find({_id:req.body._id},function(err, servicex){

      if(err)
        res.send(err.message)
      else
        res.json(servicex);

      });
},

getCreatedService : function(req,res)
{
  Service.find({_id:req.ServiceProvider._id},function(err, service){

  if(err)
    res.send(err.message)
  else
    res.json(service);

  });

},
getServiceByID:function(req, res){

  Service.find({_id:req.params.id},function(err, service){

  if(err)
    res.send(err.message)
  else
    res.json(service);

  });

},

updateRating: function(req,res){

    var rating = req.body.rating;
    console.log(rating);
//
//58fe7140d31406305f9f169e dummy data for testing
    Service.findById(req.body.serviceID,function(err,service1){

          var currRating = service1.rating;
           var avg = currRating+rating/2;
           service1.rating = avg;


         Service.changeRating(service1, function(err){

         if(err) throw err;
         console.log(service1);

         });




       });

}




}

function escapeRegex(text) {
return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"); }

module.exports = serviceController;
