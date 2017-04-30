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

      //define scope comments
      var scopesarah = $scope.sarah;
      var scopechange = $scope.change2;
      var scopedelete = $scope.delete2;

      //Reservation Creation
      $scope.reserve = function() {
        if (typeof $scope.reservation == 'undefined'){
            $scope.noreserve = "Please enter a valid reservation.";
       }
        else {
          //reservation creation
        $scope.reservation.serviceid = serviceID;
        $http.post('/reserve', $scope.reservation).then(function(response) {
          $scope.sarah = response;
          //if reservation is undefined -- user didn't enter anything
          if (typeof $scope.sarah == 'undefined') {
            $scope.noReservation = "Please select a reservation before paying.";
          }
          else {
            //open stripe handler
            if ($scope.sarah.data == "You've reserved the slot. Please proceed to pay and get your reservation confirmation.") {
              var handler = StripeCheckout.configure({
                key: 'pk_test_jTftdulbTLH0VqMNv7sm0ZSK',
                locale: 'auto',
                token: function(token) {
                  var token2 = token.id;
                  var data = {
                    token: token.id
                  }
                  //posting checkout function, passing the token from stripe
                  $http.post('/checkout', data).then(function(response) {
                    $scope.paid = response;
                  });
              }
              });
              //opening handler
              handler.open({
                name: 'Stripe.com',
                description: 'Pay for your Reservation',
                amount: 2000
              });
              //closing handler
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
        $scope.changeReservation.serviceid = serviceID;
        $http.post('/change', $scope.changeReservation).then(function(response) {
          $scope.change2 = response;
        });
      };


      //Reservation Delete
      $scope.delete = function() {
        if (typeof $scope.deleteReservation == 'undefined'){
       $scope.nodelete = "Please enter a valid reservation.";
       }
        $scope.deleteReservation.serviceid = serviceID;
        $http.post('/delete', $scope.deleteReservation).then(function(response) {
          $scope.delete2 = response;
        });
      };




    }]);
}());
