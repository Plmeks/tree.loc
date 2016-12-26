var app = angular.module("Application", []);
app.controller("TreeController", ['$scope', '$compile', 'storageService', 'treeModel', 'testingService', function($scope, $compile, storageService, treeModel, testingService) {
    $scope.delete = function(data) {
        //data.nodes = [];
        $scope.remove(data.$$hashKey, $scope.tree[0]);
    };
	$scope.test = "test";
	
	$scope.treeModel = treeModel;
	$scope.storageService = storageService;
    $scope.testingService = testingService;

    $scope.showButton = true;


    $scope.remove = function(hash, currentNode, key) {
    	var currentChild, 
      	result,
        i;
        
        //return currentNode.nodes;
    	if(hash == currentNode.$$hashKey) {
      	return key;
      } else {
      	for(i = 0; i < currentNode.nodes.length; i++) {  
        	currentChild = currentNode.nodes[i];
          result = $scope.remove(hash, currentChild, i);
          if(result !== false) {
          	currentNode.nodes.splice(result, 1);
          }
      	}
        return false;
      }
    };
    
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
    	$scope.tree = treeModel.getTree();
    };
	
    $scope.tree = [];

    $scope.tests = function() {
        $scope.testAddedNodeLength();
        $scope.testAddedNodeName();
        $scope.testRemovingNode();
        $scope.testSavingTree();
    };

    $scope.testAddedNodeLength = function() {
        var tree = {
            name: "Tree",
            nodes: [{
                name: "Tree-1",
                nodes: []
            }, {
                name: "Tree-2",
                nodes: []
            }]
        };
        var oldLength = tree.nodes.length;
        var expectedLength = oldLength + 1;

        $scope.add(tree);

        $scope.testingService.test("Added node length test", tree.nodes.length, expectedLength);
    };

    $scope.testRemovingNode = function() {
        var tree = {
            $$hashKey: "00",
            name: "Tree",
            nodes: [{
                $$hashKey: "01",
                name: "Tree-1",
                nodes: []
            }, {
                $$hashKey: "02",
                name: "Tree-2",
                nodes: []
            }]
        };
        var oldLength = tree.nodes.length;
        var expectedLength = oldLength - 1;

        $scope.remove(tree.nodes[0].$$hashKey, tree);

        $scope.testingService.test("Removing node length test", tree.nodes.length, expectedLength);
    };

    $scope.testAddedNodeName = function() {
        var tree = {
            name: "Tree",
            nodes: []
        };

        $scope.add(tree);

        $scope.testingService.test("Added node name test", tree.nodes[0].name, "Tree-1");
    };

    $scope.testSavingTree = function() {
        var tree = {
            $$hashKey: "00",
            name: "Tree",
            nodes: [{
                $$hashKey: "01",
                name: "Tree-1",
                nodes: []
            }, {
                $$hashKey: "02",
                name: "Tree-2",
                nodes: []
            }]
        };
        $scope.storageService.saveTree(tree);
        $scope.testingService.test("Saving tree test",  $scope.storageService.getTree().nodes.length, tree.nodes.length);
    };

    $scope.tests();
}]);
app.directive('autoFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.autoFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});