var db = require('../connection')
var ClassTree = require('../models/classTree');
var Link = require('../models/links');


var classTreeFunction = {

	//클래스를 하나 새로 만드는 함수.
	//부모 트리의 Id와 새로운 Tree의 이름을 인수로 받는다.
	makeClassTree : (parentId, newTreeName) =>{
		ClassTree.findOne({
			_id: parentId
		})
		.catch((e) => {
			return console.error('finding error ',e);
		})
		.then((result) => {
			if(!result){
				//만약 최상위 클래스면 부모 id를 null로 지정해줌.
				result = {};
				result._id = null;
			}
			new ClassTree({
			name: newTreeName,
			parent: result._id
			})
			.save()
			.catch((e) => {
				return console.error(e);
			})
			.then((result) => {
				console.log('success ',result);
				return result;
			})
		})
	},
	//특정 클래스에 링크를 저장해주는 함수.
	//이를 위해 링크를 추가해줄 클래스의 _id와 link의 _id를 인수로 받는다.
	addLinktoClass : function (classId, linkId){
		ClassTree.findOne({
			_id:classId
		})
		.then((result) => {
			if(!result) {
				return console.error('ERROR: NO CLASS FOUND WHEN ADDING LINK TO CLASS.')
			}else {
				result.children.push(linkId);
				result.save()
				.catch( function(e) {
					console.error(e);
				})
				.then(function(result){
					console.log('successfully link added', result);
				})
			}

		})
	},
	deleteClassTree : (parentId, Id) => {
		//delete relationship with parent
		//delete all children node.
	}
}
module.exports = classTreeFunction;
