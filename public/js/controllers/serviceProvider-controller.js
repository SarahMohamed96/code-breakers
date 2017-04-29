(function(){
    angular.module('myApp')
.controller('ServiceProviderController', ['$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams){




      /* $http.get('/api/ServiceProvider/' + $stateParams.id).then(function(response) {
        //console.log(response.data);
        $scope.service = response.data[0];
       });*/

       $scope.createOffer=function() {
       	console.log($scope.offerDescription);
       	$http.post('/createOffer', $scope.offerDescription).then(function(response) {
                 
         	});
       };
    }]);
}());