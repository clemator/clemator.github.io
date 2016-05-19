app.factory('kingdomFactory', function() {
	
	//Constructor
	function Kingdom(name) {
		this.name = name;
		this.population = 0;
		this.tax = 20;
		this.happyness = 100;
	};
	
	Kingdom.prototype.getName = function() {
		return this.name;
	};
	
	return Kingdom;
})
.factory('resourceFactory', function() {
	
	//Constructor
	function Resource() {
		this.resources = {
			wood: {amount: 0, production: 0, click: 1},
			stone: {amount: 0, production: 0, click: 1},
			food: {amount: 0, production: 0, click: 1},
			iron: {amount: 0, production: 0, click: 1},
			gold: {amount: 0, production: 0}
		};
	};
	
	Resource.prototype.getTotalAmount = function() {
		return (this.resources.wood.amount + this.resources.stone.amount + this.resources.food.amount + this.resources.iron.amount);
	};
	
	Resource.prototype.getTotalProduction = function() {
		return (this.resources.wood.production + this.resources.stone.production + this.resources.food.production + this.resources.iron.production);
	};
	
	return Resource;
})
.factory('buildingFactory', function() {
	
	//Constructor
	function Building() {
		this.buildings = [];
	};
	
	Building.prototype.getName = function() {
		return this.type;
	};
	
	var types = ['sawmill', 'quary', 'farm', 'mine', 'house'];
	
	function checkType(type) {
		return types.indexOf(type) !== -1;
	};
	
	Building.types = angular.copy(types);
	
	Building.build = function(data) {
		if (!checkType(data.type)) {
			return;
		}
		var building = {type: data.type, level: data.level - 1, production: data.production};
		if (buildings.indexOf(building))
		this.buildings.push({type: data.type, level: data.level, production: data.production});
	};
	
	return Building;
});