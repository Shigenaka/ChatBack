// Create app
var myApp = angular.module('myApp', ['ui.router', 'firebase'])

// Configure app
myApp.config(function($stateProvider) {
	$stateProvider
	.state('about', {
		url:'/about',
		templateUrl: 'templates/about.html',
		controller: 'AboutController',
	})

	.state('chatback', {
		url:'',
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
.controller('MainController', function(authentication, $scope, $firebaseAuth, $firebaseArray, $firebaseObject) {
	var ref = new Firebase('https://chatback-info343.firebaseio.com/chat');
	var user = authentication.checkLogin(ref);
	if(user) {
		$scope.userId = user.uid;
	}
})

// Landing page controller: define $scope.number as a number
.controller('AboutController', function($scope){

})

//controller for actual ChatBack segment
.controller('ChatBackController', function(authentication, $scope, $firebaseAuth, $firebaseArray, $firebaseObject){
	var ref = new Firebase('https://chatback-info343.firebaseio.com/chat');

	var makeChat = function(user) {
		$scope.userId = user.uid;
	 	var chat = new FirechatUI(ref, document.getElementById('firechat-wrapper'));
       	chat.setUser(user.uid, user.uid);
	}
	//checks if user is logged in
	var user = authentication.checkLogin(ref);
	if(user) {
		makeChat(user)
	}
	//signs user up
	$scope.signUp = function() {
		authentication.signUp(ref, $scope.email, $scope.password).then(function(){
			$scope.logIn();
		});
	};
	//logs user in
	$scope.logIn = function() {
		authentication.logIn(ref, $scope.email, $scope.password).then(makeChat);
	};
})

// Content controller: define $scope.url as an image
.controller('ProfileController', function(authentication, $scope, $firebaseAuth, $firebaseArray, $firebaseObject){
	var ref = new Firebase('https://chatback-info343.firebaseio.com/chat');
	var user = authentication.checkLogin(ref);
	if(user) {
		$scope.currEmail = user.password.email;
		$scope.currUserID = user.uid;
	}
	var authObj = $firebaseAuth(ref);
})

.controller('PrivacyController', function($scope){

})

.controller('ContactController', function($scope){

})

myApp.factory('authentication', function($firebaseAuth, $firebaseArray, $firebaseObject) {
	var authFac = {};

	authFac.checkLogin = function(ref) {
		var authObj = $firebaseAuth(ref);
		return authObj.$getAuth();
	}

	authFac.signUp = function(ref, email, password) {
		var authObj = $firebaseAuth(ref);
		return authObj.$createUser({
			email: email,
			password: password, 			
		})

	}

	authFac.logIn = function(ref, email, password) {
		var authObj = $firebaseAuth(ref);
		return authObj.$authWithPassword({
			email: email,
			password: password
		})
	}

	return authFac;
});

myApp.config(function($urlRouterProvider){
    // when there is an empty route, redirect to /index   
    $urlRouterProvider.when('', '/#');
    $urlRouterProvider.when('/#/-K52Bq-kg0ENsjGrtoRa', '/#');
})

