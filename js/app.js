angular.module("Application", []).
controller("TreeController", ['$scope', '$compile', function($scope, $compile) {
    $scope.delete = function(data) {
        //data.nodes = [];
        console.log($scope.search(data.$$hashKey, $scope.tree[0]));
    };
    
    $scope.showButton = true;
    
    $scope.search = function(hash, currentNode, key) {
    	var currentChild, 
      	result,
        i;
        
        //return currentNode.nodes;
    	if(hash == currentNode.$$hashKey) {
      	return key;
      } else {
      	for(i = 0; i < currentNode.nodes.length; i++) {  
        	currentChild = currentNode.nodes[i];
          result = $scope.search(hash, currentChild, i);
          if(result !== false) {
          	console.log(currentChild);
          	currentNode.nodes.splice(result, 1);
          }
      	}
        return false;
      }
    };
    
    $scope.saveTree = function() {
    	var tree = JSON.stringify($scope.tree);
    	localStorage.setItem('tree', tree);
    };
    
    $scope.getTree = function() {
    	$scope.tree = JSON.parse(localStorage.getItem('tree'));
      $scope.startButton = true;
    }
    
    $scope.deleteTree = function() {
    	localStorage.setItem('tree', {});
    }
    
    $scope.add = function(data) {
        var post = data.nodes.length + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({name: newName, nodes: []});
    };
    
    $scope.isRestorable = function() {
    	if(localStorage.getItem('tree'))
      	return true;
      else
        return false;
    };
    
    $scope.isSaveable = function() {
    	return $scope.tree.length;
    };
    
    $scope.startTree = function() {
    	$scope.tree = [{name: "Tree", nodes: []}];
    };
    $scope.tree = [];
}])
.directive('autoFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.autoFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});