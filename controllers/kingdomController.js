app.controller('kingdomController', ['$scope', '$http', '$window', '$interval', 'kingdomFactory', 'resourceFactory',
	function($scope, $http, $window, $interval, kingdomFactory, resourceFactory) {
		
		/*
		************************
		** SAVE AND LOAD PART **
		************************
		*/
		
		$scope.isKingdomSaved = function() {
			return (typeof localStorage.getItem("kingdomSave") !== "undefined");
		};

		$scope.save = function()
		{
			var save = {
				kingdom: $scope.kingdom
			}
			localStorage.setItem("kingdomSave", JSON.stringify(save));
			$("#top-alert").html(
				"<div class='alert alert-success alert-dismissible fade in' role='alert'><button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span></button>Game saved.</div>"
			);
		};

		$scope.load = function()
		{
			var savegame = JSON.parse(localStorage.getItem("kingdomSave"));
			if (typeof savegame.kingdom !== "undefined") $scope.kingdom = savegame.kingdom;
		};
		
		//Auto save every 60sec
		$interval(function () {
			$scope.save();
		}, 60000);

		/*
		**********************
		** DEBUG TOOLS PART **
		**********************
		*/

		$scope.displayKingdomInfo = function() {
			console.log('KINGDOM NAME : ' + $scope.kingdom.name);
			console.log('KINGDOM POPULATION : ' + $scope.kingdom.population);
			console.log('KINGDOM WOOD : ' + $scope.kingdom.resource.resources.wood.amount + " with prod : " + $scope.kingdom.resource.resources.wood.production);
			console.log('KINGDOM STONE : ' + $scope.kingdom.resource.resources.stone.amount + " with prod : " + $scope.kingdom.resource.resources.stone.production);
			console.log('KINGDOM FOOD : ' + $scope.kingdom.resource.resources.food.amount + " with prod : " + $scope.kingdom.resource.resources.food.production);
			console.log('KINGDOM IRON : ' + $scope.kingdom.resource.resources.iron.amount + " with prod : " + $scope.kingdom.resource.resources.iron.production);
		};

		// $interval(function () {
			// $scope.incrementPoint($scope.pps);
		// }, 1000);
		
		/*
		*************************
		** INITIALIZATION PART **
		*************************
		*/

		if (!$scope.isKingdomSaved()) {
			$scope.kingdom = new kingdomFactory('Your Kingdom');
			$scope.kingdom.resource = new resourceFactory();
		}
		else {
			$scope.load();
		};
		
		/*
		*************************
		** INCREMENTATION PART **
		*************************
		*/
		
		$scope.addWood = function() {
			$scope.kingdom.resource.resources.wood.amount += $scope.kingdom.resource.resources.wood.click;
		};
		
		$scope.addStone = function() {
			$scope.kingdom.resource.resources.stone.amount += $scope.kingdom.resource.resources.stone.click;
		};
		
		$scope.addFood = function() {
			$scope.kingdom.resource.resources.food.amount += $scope.kingdom.resource.resources.food.click;
		};
		
		$scope.addIron = function() {
			$scope.kingdom.resource.resources.iron.amount += $scope.kingdom.resource.resources.iron.click;
		};
	}
]);