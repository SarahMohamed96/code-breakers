var stripe= require('stripe')('sk_test_IHpYlc4fvoVyRJzbkFHgMAax');
var randomstring=require("randomstring");


//Payment controller = create Payment
let paymentController = {

    checkout: function(req, res) {
      console.log(req.body);
      var Token = req.body.token;
      var chargeAmount = "2000";
      var charge = stripe.charges.create({
          amount:chargeAmount,
          currency:"usd",
          source: req.body.token
      },function(err,charge){
          if(err && err.type === "StripeCardError"){
            var paiderror = "There has been an error. Please try refreshing the page.";
            res.json(paiderror);
          }
          if (charge){
            console.log("successfully paid!");
            console.log(Token);
            console.log(randomstring.generate(7));
            var paid = "You have successfully paid!! Your Careem promocode is: " + randomstring.generate(7);
            res.json(paid);
          }
      });
    }
  }

module.exports = paymentController;
