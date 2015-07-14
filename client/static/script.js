 var personal_app = angular.module('personal_app', ['ngRoute']);
    //  use the config method to set up routing:
    personal_app.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: './index.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

// ---------------------------
// create the UserFactory
// ---------------------------
personal_app.factory('UserFactory', function($http) {
  var factory = {};
  var users = [];
  factory.getUsers = function(callback) {
    $http.get('/users').success(function(output) {
        users = output;
        callback(users);
      });
    };
  // callback function
  factory.addUser = function(info, callback) {
    console.log('shit right here',info);
    $http.post('/users',info).success(function(output) {
        users.push(output);
        callback(users);
    });
  };
  factory.removeUser = function(data, callback) {
    // console.log(data);
    $http.post('/users/delete', data).success(function(output) {
        users = output;
        callback(users);
    });
  };
  return factory;
});



 // -------------------------
 // User Controller
 // -------------------------
personal_app.controller('UsersController', function($scope, UserFactory) {
    UserFactory.getUsers(function(data) {
      $scope.users = data;
      });
  $scope.addUser = function() {
    console.log('in front end controller', $scope.new_user);
  // callback function
    $scope.new_user.created_at = moment().format('MMMM Do, YYYY');
    UserFactory.addUser($scope.new_user, function(data) {
      $scope.users = data;  // data goes into the callback function
      $scope.new_user = {};// this clears out the input fields
    UserFactory.getUsers(function(data) {
      $scope.users = data;
      });
    });
  };

  $scope.removeUser = function (data) {
    // console.log(data);
    UserFactory.removeUser(data, function(data){
      $scope.users = data;
    UserFactory.getUsers(function(data) {
      $scope.users = data;
      });
    });
  };

});

