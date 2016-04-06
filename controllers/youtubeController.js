app.controller('youtubeController', ['$scope', '$http', '$window',
	function($scope, $http, $window) {
		$scope.search = {input: "", results: 0, resultItems: [], resultVideos: [], resultChannels: []};
		$scope.data = {
			availableOptions: [
				{name: '10', value: 10},
				{name: '20', value: 20},
				{name: '30', value: 30}
		],
			selectedOption: {name: '10', value: 10}
		};
		$scope.apiKey = 'AIzaSyD6jgZkBrETrJhcnLqZ3IC0A27xQILaQ-U';
		$scope.playVideo = false;

		$scope.handleKey = function($event) {
			if ($event.keyCode == 13) {
				$scope.search();
			}
		};
		
		$scope.search = function() {
			if (!angular.isDefined($scope.search.input)) {
				return;
			}
			$scope.search.results = 0;
			$scope.search.resultItems = [];
			$scope.search.resultChannels = [];
			$scope.search.resultVideos = [];
			
			$http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" + $scope.data.selectedOption.value + "&order=relevance&q=" + $scope.search.input + "&key=" + $scope.apiKey)
				.then(function(res) {
					$scope.search.results = res.data.pageInfo.totalResults;
					$scope.search.resultItems = res.data.items;
					
					for (item of $scope.search.resultItems) {
						if (item.id.kind == "youtube#channel")
							$scope.search.resultChannels.push(item);
						else if (item.id.kind == "youtube#video")
							$scope.search.resultVideos.push(item);
					}
				});

			// $(this).replaceWith('<iframe width="560" height="315" src="http://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>');
		};
		
		$scope.play = function(id) {
			console.log(id);
		};
		
		$scope.goToChannel = function(id) {
			$window.open('https://www.youtube.com/channel/' + id, '_blank');
		};
	}
]);