app.service('storageService', function() {
	this.saveTree = function(tree) {
    	var tree = JSON.stringify(tree);
    	localStorage.setItem('tree', tree);
    };
    
    this.getTree = function() {
		return JSON.parse(localStorage.getItem('tree'));
		//$scope.startButton = true;
    }
});