var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');
var multer = require ('multer');
var logger = require('morgan');
var favicon = require ('serve-favicon');
var exphbs = require('express-handlebars');
var mongo = require('mongodb');
var http = require('http');
require('rootpath')();
var serviceController = require('./app/controllers/serviceController');
var userController = require('./app/controllers/userController');
let Service = require('./app/models/service');
var passport = require('passport');
var nodemailer = require("nodemailer");
var complaintController = require('./app/controllers/complaintController');
var reviewController = require('./app/controllers/reviewController');
var methodOverride = require('method-override');
var reservationController = require('./app/controllers/reservationController');
var paymentController = require('./app/controllers/paymentController');
var User = require('./app/models/user');
var ServiceProvider = require('./app/models/serviceprovider');

mongoose.connect('mongodb://localhost/milestone');
var db = mongoose.connection;


require('./config/passport')(passport);

var engines = require('consolidate');
app.set('views', path.join(__dirname, '/public/views'));
// app.engine('html', engines.mustache);
app.set('view engine', 'html');
// app.use(router);

//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use('/app', express.static(__dirname + "/app" ));
app.use('/public', express.static(__dirname + "/public" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname+ '/public'));
app.use(cookieParser());
// app.use(router);
app.use(session({
  secret: 'this is the secret',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//app.use(morgan('dev'));




var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "kareemabdelaziz771996@gmail.com",
        pass: "killer8kman"
    },
    tls: {rejectUnauthorized: false},
    debug:true
});

//app call create Reservation function
app.post('/reserve', reservationController.createReservation,function(req, res){
});
//app call change Reservation function
app.post('/change', reservationController.changeReservation,function(req, res){
});
//app call delete Reservation function
app.post('/delete', reservationController.deleteReservation,function(req, res){
});
//app call checkout Payment function
app.post('/checkout', paymentController.checkout,function(req, res){

});

//layla

app.get('/',function(req, res){
res.sendfile('public/index.html');
});

//app call getting service by keyword
app.post('/api/search', serviceController.getServiceByKeyword,function(req, res){
});

//app call getting service by Category
app.post('/api/searchByCategory', serviceController.getServiceByCategory,function(req, res){
});

//app call getting service by Location
app.post('/api/searchByLocation', serviceController.getServiceByLocation,function(req, res){
});

 //app call getting service by Date
app.post('/api/searchByDate', serviceController.getServiceByDate,function(req, res){
});

//app call getting service by Offers
app.post('/api/searchByOffers', serviceController.getServiceByOffer,function(req, res){
});

//app call getting service by Rating
app.post('/api/searchByRating', serviceController.getServiceByRating,function(req, res){
});

//app call getting all services
app.get('/api/serviceslist',serviceController.getAllServices,function(req, res){
});

//app call getting service by id
app.get('/api/service/:id',serviceController.getServiceByID, function(req, res){
});




  app.post('/api/createOffer', serviceController.offerCreate, function(req,res){
   console.log("xyz");
});
app.post('/api/updateUser', userController.updateUser,function(req, res){

      });

  app.post('/api/service', serviceController.deleteOffer, function(req, res){

    console.log("abc");

 });

///nadeen

app.post('/api/addService', serviceController.createService,function(req, res){

      });
app.put('/api/updateService', serviceController.updateService,function(req, res){

      });
app.get ('/api/deleteService', serviceController.deleteService, function(req,res){

});





//merna

    app.post("/login", passport.authenticate('local-login'), function(req, res) {
      res.json(req.user);
    });

    // handle logout
    app.post("/logout", function(req, res) {
      req.logOut();
      res.send(200);
    })

    // loggedin
    app.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

    // signup
    app.post("/signup", function(req, res) {
      console.log(req.body);
      User.findOne({
        username: req.body.username
      }, function(err, user) {
        if (user) {
          res.json(null);
          return;
        } else {
          var newUser = new User();
          newUser.username = req.body.username.toLowerCase();
          newUser.password = newUser.generateHash(req.body.password);
          newUser.save(function(err, user) {
            req.login(user, function(err) {
              if (err) {
                return next(err);
              }
              res.json(user);
            });
          });
        }
      });
    });

    app.post("/signupsp", function(req, res) {
      console.log(req.body);
      ServiceProvider.findOne({
        email: req.body.email
      }, function(err, serviceprovider) {
        if (serviceprovider) {
          res.json(null);
          return;
        } else {
          var newServiceProvider = new ServiceProvider();
          newServiceProvider.email = req.body.email.toLowerCase();
          newServiceProvider.password = newServiceProvider.generateHash(req.body.password);
          newServiceProvider.save(function(err, newServiceProvider) {
            req.login(newServiceProvider, function(err) {
              if (err) {
                return next(err);
              }
              res.json(newServiceProvider);
            });
          });
        }
      });
    });

    ///youssef



//post el kano fe server.js
app.post("/complaint/createComplaint", complaintController.createComplaint, function(req, res){

});

app.post("/createReview", reviewController.createReview, function(req, res){
  console.log("mjanj");

});

app.post("/getReviews", reviewController.getAllReviews, function(req, res){

});




app.listen(3000, function(){
console.log("The app is running on port 3000!!");


});

app = exports = module.exports;
