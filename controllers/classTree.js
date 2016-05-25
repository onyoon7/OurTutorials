var db = require('../connection')
var ClassTree = require('../models/classTree');




function makeClassTree(parentId) { 
	ClassTree.find({
		_id: parentId
	}, function(err, result){
		if(err) return console.error(err);
		new ClassTree({
		name: 'server',
		parent: result[0]._id
		}).save( function (err, result){
			if(err) return console.error(err);
			console.log(result);
		})
	});
}


function 
