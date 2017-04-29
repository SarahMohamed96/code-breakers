(function(){
    angular.module('myApp')
.controller('UController', ['$scope', '$state', '$http', function($scope, $state, $http){





$scope.updateUser = function() {

$http.post('/api/updateUser', $scope.user).then(function(response) {

$scope.user = response.data;
});

};


    }]);
}());