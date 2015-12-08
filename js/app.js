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

})

// Content controller: define $scope.url as an image
.controller('ProfileController', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){

})

.controller('PrivacyController', function($scope){

})

.controller('ContactController', function($scope){

})

