(function() {
  angular.module('myApp')
    .controller('ServiceController', ['$scope', '$state', '$http', '$stateParams', '$window', function($scope, $state, $http, $stateParams, $window) {

      $http.get('/api/service/' + $stateParams.id).then(function(response) {
        console.log(response.data);
        $scope.service = response.data[0];

      });



      var serviceID = $stateParams.id;




      $scope.reviewsubmit = function() {
        console.log("fvismiovmsimi");
        $scope.review.serviceID = serviceID;
        console.log($scope.review);
        $http.post('/createReview', $scope.review).then(function(response) {

        });




      };


      $scope.createComplain = function() {
        console.log("createComplain");
        console.log($scope.complain);
        $http.post('/complaint/createComplaint', $scope.complain).then(function(response) {

        });

      };

      var refresh = function() {
        var data = {
          serviceID: $stateParams.id
        }
        $http.post('/getReviews', data).then(function(response) {
          console.log("I got the reviews I requested");
          console.log(response.data);
          $scope.reviews = response.data;
        });
      };

      refresh();

             $scope.updateRating = function() {
              console.log($scope.rate);

             $http.post('/api/rating',$scope.rate).then(function(response) {

             });

             };






    }]);
}());
