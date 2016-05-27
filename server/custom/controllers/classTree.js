const db = require('../connection')
const ClassTree = require('../models/classTree');
const Link = require('../models/links');

module.exports = {
	getChildrenClasses : (req, res, next) =>{
		let MyId = req.body.id;
		ClassTree.findOne({
			_id: myId
		})
		.then((me) => {
			console.log(me.children)
			LinkIds = [];
			for(let i=0; i<me.children.length; i++){
				id.push(me.children[i].childId);
			}

			//이부분은 다시 테스트를 해 보아야 함.
			Link.find({
			    '_id': { $in: id}
			})
			.then((links) => {
				console.log(links);
			})
		})
		.catch((e) => {
			console.error(e)
		})
	},
	getAllLinks : (req, res, next) =>{
		let myId = req.body.id;
		let returnArray = [];
		ClassTree.find({
			'parent.parentId': myId
		})
		.then((children)=>{
			console.log(' successfully found All children ')
			for(let i=0; i<children.length; i++){
				console.log(children[i].name);
				returnArray = returnArray.concat(children[i].links)
			}
			res.json(returnArray);
		})
		.catch((e) => {
			console.error('Error :' , e)
		})
	},
	addClass : (req, res, next) =>{
		//클래스를 특정 부모 클래스 밑에 붙인다.
		//예 : '자바스크립트' 클래스에 '서버'클래스를 붙이고 싶으면
		//'자바스크립트'클래스 아이디와 '서버'클래스 아이디를 붙이면 됨.
		let parentId = req.body.parentId;
		let newTreeName = req.body.newClassName
		let newTreeParent;
		ClassTree.findOne({
			_id: parentId
		})
		.then((parent) => {
			if(!parent){
				newTreeParent = [];
			}else{
			newTreeParent = parent.parent.slice();
			newTreeParent.push({
					parentId:parent._id,
					name: parent.name
				});
			}	

			new ClassTree({				
			name: newTreeName,
			parent: newTreeParent
			})
			.save()
			.catch((e) => {
				return console.error(e);
			})
			.then((newClass) => {
				console.log('success ',newClass);
				if(parent){
					parent.children.push({
						childId: newClass._id,
						name: newClass.name
					});
					parent.save()
					.then((r)=>{
						res.json(newClass);
					})
					.catch((e) =>{
						return console.error('ERROR :saving newClass\'s id to parent Class\' children array ', e)
					})
				}
			})
		})
		.catch((e) => {
			return console.error('finding error ',e);
		})
	},
	//특정 클래스에 링크를 저장해주는 함수.
	//이를 위해 링크를 추가해줄 클래스의 _id와 link의 _id를 인수로 받는다.
	addLinktoClass : function (req, res, next){
		let classId = req.body.classId;
		let linkId = req.body.linkId;
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

