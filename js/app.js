// Create app
var myApp = angular.module('myApp', ['ui.router' 'firebase'])

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
	var postRef = new Firebase('https://chatback-info343.firebaseio.com/posts');
	var chatRef = new Firebase('https://chatback-info343.firebaseio.com/chat');
})

// Content controller: define $scope.url as an image
.controller('ProfileController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
	var ref = new Firebase('https://chatback-info343.firebaseio.com/');
})

.controller('PrivacyController', function($scope){

})

.controller('ContactController', function($scope){

})

