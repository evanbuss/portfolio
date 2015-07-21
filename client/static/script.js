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

// ---------------------------
// Message Factory
// ---------------------------
personal_app.factory('MessageFactory', function($http) {
  var factory = {};
  var messages = [];
  factory.getMessages = function(callback) {
    $http.get('/messages').success(function(output) {
        messages = output;
        // console.log('MessageFactory getMessages() gave', output);
        callback(output);
      });
    };
  factory.addMessage = function(info, callback) {
    $http.post('/messages',info).success(function(output) {
        // console.log('factory', output);
        messages.push(output);
        callback(messages);
    });
  };
  return factory;
});

 // #########################
 // User Controller
 // #########################
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

// #########################
// Message Controller
// #########################
personal_app.controller('MessageController', function($scope, MessageFactory) {
  MessageFactory.getMessages(function(data) {
      $scope.messages = data;
  });
  $scope.addMessage = function() {
    // using Moment.js to format date
    $scope.new_message.created_at = moment().format('MMMM Do, YYYY');
      MessageFactory.addMessage($scope.new_message, function(data) {
        $scope.messages = data;  // data goes into the callback function
        $scope.new_message = {}; // this clears out the input fields
      MessageFactory.getMessages(function(data) {
        $scope.messages = data;
        });
      });
    };

  $scope.validation = function(data) {
    function validate() {
      if(data.input === "scope.show") {
        console.log("valid");
          $scope.valid = {
              show: true,
              hide: false
          };
      }
    }
    validate();
  };

});

