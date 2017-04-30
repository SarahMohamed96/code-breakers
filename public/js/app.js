(function() {
  angular.module('myApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('search', {
          url: "/search",
          templateUrl: "public/views/search.html",
          controller: "SearchController"
        })

        .state('search2', {
          url: "/search2",
          templateUrl: "public/views/search2.html",
          controller: "SearchController"
        })


        .state('service', {
          url: "/service/:id",
          templateUrl: "public/views/service.html",
          controller: "ServiceController"
        })

        .state('home', {
          url: "/",
          templateUrl: "public/views/home.html",
          controller: "SearchController"

        })
        //state in service page
        .state('reserve', {
          url: "/service/:id/reservation",
          templateUrl: "public/views/reservation.html",
          controller: "ServiceController"

        })
        //state of creating a reservation
        .state('reservenow', {
          url: "/service/:id/reserve",
          templateUrl: "public/views/reserve.html",
          controller: "ReservationController"

        })
        //state of changing a reservation
        .state('change', {
          url: "/service/:id/change",
          templateUrl: "public/views/change.html",
          controller: "ReservationController"

        })
        //state of deleting a reservation
        .state('delete', {
          url: "/service/:id/delete",
          templateUrl: "public/views/delete.html",
          controller: "ReservationController"

        })
        //state of paying after a reservation
        .state('checkout', {
          url: "/checkout",
          templateUrl: "public/views/checkout.html",
          controller: "PaymentController"

        })

        .state('reviews', {
          url: "/service/:id/reviews",
          templateUrl: "public/views/reviews.html",
          controller: "ServiceController"

        })

           .state('complain', {
            url: "/service/:id/complain",
            templateUrl: "public/views/complains.html",
            controller: "ServiceController"

           })


        .state('signup', {
        url: "/signup",
        templateUrl: "public/views/signup.html",
        controller: "SignUpCtrl"
        })

        .state('login', {
        url: "/login",
        templateUrl: "public/views/login.html",
        controller: "LoginCtrl"
        })

        .state('loginsp', {
        url: "/loginsp",
        templateUrl: "public/views/loginsp.html",
        controller: "LoginspCtrl"
        })

        .state('signupsp', {
        url: "/signupsp",
        templateUrl: "public/views/signupsp.html",
        controller: "SignUpSPCtrl"
        })


        .state('createService', {
            url: "/addService",
            templateUrl: "public/views/createService.html",
            controller: "SController"

        })


           .state('updateService', {
           url: "/updateService",
           templateUrl: "public/views/updateService.html",
           controller: "SController"

        })



         .state('updateUser', {
        url: "/updateUser",
        templateUrl: "public/views/updateUser.html",
        controller: "UController"

        })

        .state('serviceProvider', {
          url: "/serviceProvider",
          templateUrl: "public/views/serviceProvider.html",
          controller: "ServiceProviderController"
        })



        .state('profile', {
        url: "/profile",
        templateUrl: "public/views/profile.html",
        controller: "LoginCtrl"
         })


       })

}());



  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
}

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(serviceprovider) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (serviceprovider !== '0') {
      $rootScope.currentServiceProvider = serviceprovider;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
}
