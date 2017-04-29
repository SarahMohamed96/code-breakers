(function(){
    angular.module('myApp')
   .controller('SearchController', ['$scope', '$state', '$http', function($scope, $state, $http){

     var refresh = function() {
       $http.get('api/serviceslist').then(function(response) {
         console.log(response.data);
         $scope.services = response.data;
       });
     };

     refresh();


       $scope.searchByKeyword = function() {
       $http.post('api/search', $scope.search).then(function(response) {
       console.log(response.data);
       $scope.services = response.data;
       });

     };

       $scope.searchByCategory = function(){
       $http.post('api/searchByCategory', $scope.selectpicker).then(function(response) {
       console.log(response.data);
       $scope.services = response.data;

     });
   };

     $scope.searchByLocation = function(){
     $http.post('api/searchByLocation', $scope.selectpicker).then(function(response) {
     console.log(response.data);
     $scope.services = response.data;

   });
 };

   $scope.searchByDate = function(){
   $http.post('api/searchByDate').then(function(response) {
   console.log(response.data);
   $scope.services = response.data;

 });
};

  $scope.searchByOffers= function(){
  $http.post('api/searchByOffers').then(function(response) {
  console.log(response.data);
  $scope.services = response.data;

});
};

  $scope.searchByRating = function(){
  $http.post('api/searchByRating').then(function(response) {
  console.log(response.data);
  $scope.services = response.data;

});
};



    }]);
}());
