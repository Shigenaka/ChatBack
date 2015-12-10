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
		console.log($scope.userId)
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
		location.reload();
	};

	$scope.logOut = function() {
		authentication.logOut(ref)
		window.location.replace("https://staff.washington.edu/mshig19/info343/ChatBack/");
	};
})

// Content controller: define $scope.url as an image
.controller('ProfileController', function(authentication, $scope, $firebaseAuth, $firebaseArray, $firebaseObject){
	var ref = new Firebase('https://chatback-info343.firebaseio.com/chat');
	var user = authentication.checkLogin(ref);
	if(user) {
		$scope.userId = user.uid;
		console.log($scope.userId)
	}
	$scope.showEmail = function() {
		$scope.changeEmail ^= true;
		$scope.changePassword = false;
	}

	$scope.showPassword = function() {
		$scope.changePassword ^= true;
		$scope.changeEmail = false;
	}
	$scope.changeEmail = function() {
		authentication.changeEmail(ref, $scope.emOldEmail, $scope.emOldPassword, $scope.newEmail).then(function() {
			alert('You changed your email, it will reflect this change the next time you log in.');
		});
	}

	$scope.changePassword = function() {
		authentication.changePassword(ref, $scope.passOldEmail, $scope.passOldPassword, $scope.newPassword).then(function() {
			alert('You changed your password, it will reflect this change the next time you log in.');
		});
	}
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

	authFac.changeEmail = function(ref, oEmail, password, nEmail) {
		var authObj = $firebaseAuth(ref);
		return authObj.$changeEmail({
			oldEmail: oEmail,
		  	newEmail: nEmail,
		  	password: password
		});
	}

	authFac.changePassword = function(ref, email, oPassword, nPassword) {
		var authObj = $firebaseAuth(ref);
		return authObj.$changePassword({
		  	email: email,
		  	oldPassword: oPassword,
			newPassword: nPassword
		})
	}

	authFac.logOut = function(ref) {
		var authObj = $firebaseAuth(ref);
		return authObj.$unauth();
	}

	return authFac;
});

