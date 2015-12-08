// Create app
var myApp = angular.module('myApp', ['ui.router'])

// Configure app
myApp.config(function($stateProvider) {
	$stateProvider
	.state('application', {
		url:'/application',
		templateUrl: 'templates/application.html',
		controller: 'ApplicationController',
	})
	.state('about', {
		url:'/',
		templateUrl: 'templates/about.html',
		controller: 'AboutController',
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
	.state('help', {
		url:'/help',
		templateUrl: 'templates/help.html',
		controller: 'HelpController',
	})
})

// Landing page controller: define $scope.number as a number
.controller('ApplicationController', function($scope){
})

// About page controller: define $scope.about as a string
.controller('AboutController', function($scope){
})

// Content controller: define $scope.url as an image
.controller('ProfileController', function($scope){
})

.controller('PrivacyController', function($scope){
})

.controller('HelpController', function($scope){
})

