// Create app
var myApp = angular.module('myApp', ['ui.router', 'firebase'])

// Configure app
myApp.config(function($stateProvider) {
	$stateProvider
	.state('about', {
		url:'/',
		templateUrl: 'templates/about.html',
		controller: 'AboutController',
	})

	.state('chatback', {
		url:'/chatback',
		templateUrl: 'templates/chatback.html',
		controller: 'ChatBackController',
	})

	.state('profile', {
		url:'/profile',
		templateUrl: 'templates/profile.html',
		controller: 'ProfileController',
	})

	.state('privacy', {
		url:'/privacy',
		templateUrl: 'templates/privacy.html',
		controller: 'PrivacyController',
	})

	.state('contact', {
		url:'/contact',
		templateUrl: 'templates/contact.html',
		controller: 'ContactController',
	})
})

// Landing page controller: define $scope.number as a number
.controller('AboutController', function($scope){

})

// About page controller: define $scope.about as a string
.controller('ChatBackController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
	var ref = new Firebase('https://chatback-info343.firebaseio.com/chat');
	var chatRef = new Firebase('https://chatback-info343.firebaseio.com/chat');

	$scope.authObj = $firebaseAuth(ref);

	var authData = $scope.authObj.$getAuth();

	//check to see if logged in already
	if(authData) {
		console.log(authData);
		var chat = new FirechatUI(ref, document.getElementById('firechat-wrapper'));
      	chat.setUser(authData.uid, authData.uid);
	}

	//sign up
	$scope.signUp = function() {
		$scope.authObj.$createUser({
			email: $scope.email,
			password: $scope.password, 			
		})
		.then($scope.logIn)
	}

	//login
	$scope.logIn = function() {
		$scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		}).then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			  $scope.userId = authData.uid
			  var chat = new FirechatUI(ref, document.getElementById('firechat-wrapper'));
      			chat.setUser(authData.uid, authData.uid);
		}).catch(function(error) {
			  console.error("Authentication failed:", error);
		});
	}

	//logout
	$scope.logOut = function() {
		$scope.authObj.$unauth()
		$scope.userId = false
	}
})

// Content controller: define $scope.url as an image
.controller('ProfileController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
	var ref = new Firebase('https://chatback-info343.firebaseio.com/');
})

.controller('PrivacyController', function($scope){

})

.controller('ContactController', function($scope){

})

