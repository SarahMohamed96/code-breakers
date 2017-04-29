// "use strict";
(function() {
  angular.module('myApp')
    .controller('ReservationController', ['$scope', '$state', '$http', '$stateParams', '$location', function($scope, $state, $http, $stateParams, $location) {


      //Getting Service ID
      $http.get('/api/service/' + $stateParams.id).then(function(response) {
        console.log(response.data);
        $scope.service = response.data[0];
      });


      var serviceID = $stateParams.id;
      console.log($stateParams.id);

      var scopesarah = $scope.sarah;
      var scopechange = $scope.change2;
      var scopedelete = $scope.delete2;

      //Reservation Creation
      $scope.reserve = function() {
        if (typeof $scope.reservation == 'undefined'){
            $scope.noreserve = "Please enter a valid reservation.";
       }
        else {
        console.log($scope.reservation);
        $scope.reservation.serviceid = serviceID;
        $http.post('/reserve', $scope.reservation).then(function(response) {
          console.log("hello");
          $scope.sarah = response;
          console.log(response);
          if (typeof $scope.sarah == 'undefined') {
            $scope.noReservation = "Please select a reservation before paying.";
          }
          else {
            if ($scope.sarah.data == "You've reserved the slot. Please proceed to pay and get your reservation confirmation.") {
              var handler = StripeCheckout.configure({
                key: 'pk_test_jTftdulbTLH0VqMNv7sm0ZSK',
                locale: 'auto',
                token: function(token) {
                  console.log(token.id);
                  var token2 = token.id;
                  console.log(token2);
                  var data = {
                    token: token.id,
                  }
                  console.log(data);
                  $http.post('/checkout', data).then(function(response) {
                    $scope.paid = response;
                  });
                  // Use the token to create the charge with a server-side script.
                  // You can access the token ID with `token.id`
              }
              });

              handler.open({
                name: 'Stripe.com',
                description: 'Pay for your Reservation',
                amount: 2000
              });

              handler.close();
            }
            else {
            $scope.noReservation = "Please select a reservation before paying.";}
          }

        });
       }
      };

      //Reservation Change
      $scope.change = function() {
         if (typeof $scope.changeReservation == 'undefined'){
        $scope.nochange = "Please enter a valid reservation.";
        }
        console.log($scope.changeReservation);
        $scope.changeReservation.serviceid = serviceID;
        $http.post('/change', $scope.changeReservation).then(function(response) {
          console.log("hello2");
          $scope.change2 = response;
          console.log(response);
        });
      };


      //Reservation Delete
      $scope.delete = function() {
        if (typeof $scope.deleteReservation == 'undefined'){
       $scope.nodelete = "Please enter a valid reservation.";
       }
        console.log($scope.deleteReservation);
        $scope.deleteReservation.serviceid = serviceID;
        $http.post('/delete', $scope.deleteReservation).then(function(response) {
          console.log("hello3");
          $scope.delete2 = response;

        });
      };

      //Redirection to checkout page from reservation
      // $scope.redirect = function() {
      //   if (typeof $scope.sarah == 'undefined') {
      //     $scope.noReservation = "Please select a reservation before paying.";
      //   }
      //   else {
      //     if ($scope.sarah.data == "You've reserved the slot. Please proceed to pay and get your reservation confirmation.") {
      //       $location.url('/checkout');
      //     }
      //     else {
      //     $scope.noReservation = "Please select a reservation before paying.";}
      //   }
      //
      //
      // };



    }]);
}());
