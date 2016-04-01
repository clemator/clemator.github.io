app.controller('youtubeController', ['$scope', function($scope) {
	$scope.search = {input: "", results: 0, resultItem: []};
	$scope.data = {
		availableOptions: [
			{name: '10', value: 10},
			{name: '20', value: 20},
			{name: '30', value: 30}
    ],
		selectedOption: {name: '10', value: 10}
	};
	console.log($scope.search.input);
	$scope.apiKey = 'AIzaSyD6jgZkBrETrJhcnLqZ3IC0A27xQILaQ-U';
	$scope.query;

	$scope.handleKey = function($event) {
		if ($event.keyCode == 13) {
			$scope.search();
		}
	}
	$scope.search = function() {
		if (!angular.isDefined($scope.search.input)) {
			console.log($scope.search.input);
			return;
		}
		
		$scope.query = $.ajax({
			type: 'GET',
			dataType: "json",
			url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=" + $scope.data.selectedOption.value + "&order=relevance&q=" + $scope.search.input + "&key=" + $scope.apiKey
		});
		$scope.query.done(function() {
			$("#search-results").replaceWith('<p id="search-results">Total results : ' + $scope.query.responseJSON.pageInfo.totalResults);
			$("#search-video-result").replaceWith('<div id="search-video-result"></div>');
			$.each($scope.query.responseJSON.items, function(i, item) {
				if ($scope.query.responseJSON.items[i].id.kind == "youtube#channel")
					$("#search-video-result").append("<div class='result-item'><span class='title'><strong>Channel :</strong> " + $scope.query.responseJSON.items[i].snippet.title + "</span></br>" + '<img id="channel' + $scope.query.responseJSON.items[i].id.channelId + '" src="' + $scope.query.responseJSON.items[i].snippet.thumbnails.default.url + '"/></br></div>');
				else if ($scope.query.responseJSON.items[i].id.kind == "youtube#video")
					$("#search-video-result").append("<div class='result-item'><span class='title'>" + $scope.query.responseJSON.items[i].snippet.title + "</br>" + '<img id="' + $scope.query.responseJSON.items[i].id.videoId + '" src="' + $scope.query.responseJSON.items[i].snippet.thumbnails.medium.url + '" style="cursor: pointer;"/></br></div>');
			});
			$("img").click(function(event) {
				var id = event.target.id;
				if (id.length == 11)
					$(this).replaceWith('<iframe width="560" height="315" src="http://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>');
			});
			$("#search-video-result").show();
			$("#search-results").show();
		});
	};
}]);