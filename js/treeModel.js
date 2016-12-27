app.factory('treeModel', function() {
	var tree = [
		{
			name: "Tree",
			root: true,
			nodes: []
		}
	];
	
	var getTree = function() {
		return tree;
	};
	
	var setTree = function(value) {
		tree = value;
	};
	
	return {
		getTree: getTree,
		setTree: setTree
	}
});