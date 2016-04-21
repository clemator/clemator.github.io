app.controller('incrementalController', ['$scope', '$http', '$window', '$interval',
	function($scope, $http, $window, $interval) {
		$scope.pointName = "Smarties";
		$scope.points = 0;
		$scope.pps = 0;
		$scope.clickValue = 1;
		$scope.clickLvl = 1;
		$scope.clickUpNextCost = 200;
		$scope.cursors = 0;
		$scope.cursorUpLvl = 1;
		$scope.cursorNextCost = 10;
		$scope.cursorUpNextCost = 100;
		$scope.cursorClickValue = 1;
		$scope.cursorPps = 0;
		$scope.prestige = 0;

		/*
		***************
		** MATH PART **
		***************
		*/

		$scope.incrementPoint = function(x)
		{
			$scope.points += x;
		};

		$scope.decrementPoint = function(x)
		{
			$scope.points -= x;
		};

		$scope.computePps = function()
		{
			$scope.cursorPps = $scope.cursors * $scope.cursorClickValue;
			$scope.pps = $scope.cursorPps;
		};

		/*
		**********************
		** BUY UPGRADE PART **
		**********************
		*/

		$scope.upClick = function() {
			$scope.clickUpNextCost = Math.floor(200 * Math.pow(2.0, $scope.clickLvl - 1));
			if ($scope.points >= $scope.clickUpNextCost) {
				$scope.clickValue *= 2;
				$scope.clickLvl += 1;
				$scope.decrementPoint($scope.clickUpNextCost);
				$scope.computePps();
			}
			$scope.clickUpNextCost = Math.floor(200 * Math.pow(2.0, $scope.clickLvl - 1));
			$scope.refreshClick();
		};

		$scope.buyCursor = function()
		{
			$scope.cursorNextCost = Math.floor(10 * Math.pow(1.2, $scope.cursors));
			if ($scope.points >= $scope.cursorNextCost) {
				$scope.cursors += 1;
				$scope.decrementPoint($scope.cursorNextCost);
				$scope.computePps();
			}
			$scope.cursorNextCost = Math.floor(10 * Math.pow(1.2, $scope.cursors));
			$scope.refreshCursors();
		};

		$scope.upCursors = function()
		{
			$scope.cursorUpNextCost = Math.floor(100 * Math.pow(7.0, $scope.cursorUpLvl - 1));
			if ($scope.points >= $scope.cursorUpNextCost) {
				$scope.cursorUpLvl += 1;
				$scope.cursorClickValue *= 2;
				$scope.decrementPoint($scope.cursorUpNextCost);
				$scope.computePps();
			}
			$scope.cursorUpNextCost = Math.floor(100 * Math.pow(7.0, $scope.cursorUpLvl - 1));
			$scope.refreshCursors();
		};

		/*
		************************
		** SAVE AND LOAD PART **
		************************
		*/

		$scope.save = function()
		{
			var save = {
				points: $scope.points,
				cursors: $scope.cursors,
				prestige: $scope.prestige,
				pps: $scope.pps,
				cursorNextCost: $scope.cursorNextCost,
				cursorUpLvl: $scope.cursorUpLvl,
				cursorUpNextCost: $scope.cursorUpNextCost,
				clickLvl: $scope.clickLvl,
				clickUpNextCost: $scope.clickUpNextCost
			}
			localStorage.setItem("save",JSON.stringify(save));
			$("#top-alert").html(
				"<div class='alert alert-success alert-dismissible fade in' role='alert'><button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span></button>Game saved.</div>"
			);
		};

		$scope.load = function()
		{
			var savegame = JSON.parse(localStorage.getItem("save"));
			if (typeof savegame.points !== "undefined") $scope.points = savegame.points;
			if (typeof savegame.cursors !== "undefined") $scope.cursors = savegame.cursors;
			if (typeof savegame.prestige !== "undefined") $scope.prestige = savegame.prestige;
			if (typeof savegame.pps !== "undefined") $scope.pps = savegame.pps;
			if (typeof savegame.cursorNextCost !== "undefined") $scope.cursorNextCost = savegame.cursorNextCost;
			if (typeof savegame.cursorUpLvl !== "undefined") $scope.cursorUpLvl = savegame.cursorUpLvl;
			if (typeof savegame.cursorUpNextCost !== "undefined") $scope.cursorUpNextCost = savegame.cursorUpNextCost;
			if (typeof savegame.clickLvl !== "undefined") $scope.clickLvl = savegame.clickLvl;
			if (typeof savegame.clickUpNextCost !== "undefined") $scope.clickUpNextCost = savegame.clickUpNextCost;
			$scope.refreshAll();
		};

		/*
		******************
		** REFRESH PART **
		******************
		*/

		$scope.refreshCursors = function()
		{
			$scope.cursorClickValue = Math.pow(2, $scope.cursorUpLvl - 1);
		};

		$scope.refreshClick = function() {
			$scope.clickValue = Math.pow(2, $scope.clickLvl - 1);
		};

		$scope.refreshAll = function()
		{
			$scope.refreshCursors();
			$scope.refreshClick();
		};

		/*
		**********************
		** DEBUG TOOLS PART **
		**********************
		*/

		$scope.displayCursorsInfo = function() {
			console.log('CURSORS OWNED : ' + $scope.cursors);
			console.log('CURSORS LEVEL : ' + $scope.cursorUpLvl);
			console.log('CURSORS CLICK VALUE : ' + $scope.cursorClickValue);
			console.log('CURSORS PPS : ' + ($scope.cursorClickValue * $scope.cursors));
		}

		$interval(function () {
			$scope.incrementPoint($scope.pps);
		}, 1000);

		$interval(function () {
			$scope.save();
		}, 60000);
	}
]);