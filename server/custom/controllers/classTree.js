var db = require('../connection')
var ClassTree = require('../models/classTree');
var Link = require('../models/links');


var classTreeFunction = {
	getClassTree :(req,res,next) => {
		var parentId = req.body.id;
		if(!parentId){
			parentId = null;
		}
		ClassTree.find({
			parent: parentId
		})
		.then((classArray) => {
			res.json(classArray);
		})
		.catch( (e) => {
			console.error('ERROR WITH GET CLASS TREE : ',e)
		})
	},
	getSiblingClasses : (req, res, next) => {
		var parentId;
		ClassTree.findOne({
			_id:req.body.id
		})
		.then((result){
			ClassTree.find({
				parent: result.parent
			})
			.then((result) => {
				res.json(result);
			})
			.catch((e) => {
				res.end(e);
			})
		})
		.catch((e) => {
			res.end(e)
		})
	},
	getAllLinkFromClassTree: () => {}, 
	//클래스를 하나 새로 만드는 함수.
	//부모 트리의 Id와 새로운 Tree의 이름을 인수로 받는다.
	addClass : (req,res,next) =>{
		//클래스를 특정 부모 클래스 밑에 붙인다.
		//예 : '자바스크립트' 클래스에 '서버'클래스를 붙이고 싶으면
		//'자바스크립트'클래스 아이디와 '서버'클래스 아이디를 붙이면 됨.
		var parentId = req.body.id;
		var newTreeName = req.body.newTreeName
		ClassTree.findOne({
			_id: parentId
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
				res.json(result);
			})
		})
		.catch((e) => {
			return console.error('finding error ',e);
		})
	},
	//특정 클래스에 링크를 저장해주는 함수.
	//이를 위해 링크를 추가해줄 클래스의 _id와 link의 _id를 인수로 받는다.
	addLinktoClass : function (req, res, next){
		var classId = req.body.classId;
		var linkId = req.body.linkId;
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
	deleteClassTree : (req, res, next) => {
		//delete relationship with parent
		//delete all children node.
	}
}
module.exports = classTreeFunction;
