(function() {
  angular.module('myApp')
    .controller('PaymentController', ['$scope', '$state', '$http', '$stateParams',
      function($scope, $state, $http, $stateParams) {


        $http.get('/api/service/' + $stateParams.id).then(function(response) {
          console.log(response.data);
          $scope.service = response.data[0];
        });


        var serviceID = $stateParams.id;
        console.log($stateParams.id);

        var handler = StripeCheckout.configure({
          key: 'pk_test_jTftdulbTLH0VqMNv7sm0ZSK',
          locale: 'auto',
          token: function(token) {
            console.log(token.id);
            var token2 = token.id;
            console.log(token2);
            var data = {
              token: token.id
            }
            console.log(data);
            $http.post('/checkout', data).then(function(response) {
              console.log("hello3");
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
    ]);
}());
