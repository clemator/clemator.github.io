app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
		.when('/youtube', {
			templateUrl: 'views/youtube-search.html',
			controller: 'youtubeController'
		})
		.when('/incremental', {
			templateUrl: 'views/incremental.html',
			controller: 'incrementalController'
		})
		.otherwise({
            redirectTo: '/home'
        });
	}
]);