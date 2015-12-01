// Create app
var myApp = angular.module('myApp', ['ui.router'])

// Configure app
myApp.config(function($stateProvider) {
	$stateProvider
	.state('resume', {
		url:'/resume',
		templateUrl: 'templates/resume.html',
		controller: 'ResumeController',
	})
	.state('interests', {
		url:'/interests',
		templateUrl: 'templates/interests.html',
		controller: 'InterestsController',
	})

	.state('work', {
		url:'/work',
		templateUrl: 'templates/work.html',
		controller: 'WorkController',
	})
})

// Landing page controller: define $scope.number as a number
.controller('ResumeController', function($scope){
  $scope.resume = "../pics/resume2.jpg";
})

// About page controller: define $scope.about as a string
.controller('interestsController', function($scope){
})

// Content controller: define $scope.url as an image
.controller('WorkController', function($scope, $http){
	// parses the json file and scopes the array
	$http.get("projects.json").success(function(response){
		$scope.projects = response;
		console.log($scope.projects);
	});
})

