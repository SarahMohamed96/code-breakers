(function(){
var app= angular.module('myApp')

app.controller("NavCtrl", ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {
  $scope.logout = function() {
    $http.post("/logout")
      .then(function() {
        $rootScope.currentUser = null;
        //$location.url("/home");
      });
  }
}]);

app.controller("SignUpCtrl", ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {

  $scope.signup = function(user) {
    console.log($scope.user);
    // TODO: verify passwords are the same and notify user
    if (user.password == user.password2) {
      $http.post('/signup', user)
        .then(function(user) {
          $rootScope.currentUser = user;
          $location.url("/profile");
        });
    }
  }
}]);


app.controller("SignUpSPCtrl", ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
  $scope.signupSP = function(serviceprovider) {
   console.log(serviceprovider);
    // TODO: verify passwords are the same and notify user
    if (serviceprovider.password == serviceprovider.password2) {
      $http.post('/signupsp', serviceprovider)
        .then(function(serviceprovider) {
          $rootScope.currentserviceProvider = serviceprovider;
          $location.url("/profilesp");
        });
    }
  }
}]);


app.controller("LoginCtrl", ['$scope', '$http', '$rootScope', '$location',function($scope, $http, $rootScope, $location) {

    $scope.login = function(user) {
    $http.post('/login', user)
      .then(function(response) {
        console.log(response.data);

        // $rootScope.currentUser = response;

        $location.url("/profile");
        $scope.user = response.data;

      });
  }
}]);

app.controller("LoginspCtrl", ['$scope', '$http', '$rootScope', '$location',function($scope, $http, $rootScope, $location) {

    $scope.loginsp = function(serviceprovider) {
    $http.post('/loginsp', serviceprovider)
      .then(function(response) {
        $rootScope.currentServiceProvider = response;
        $location.url("/profile");
      });
  }
}]);

}());
