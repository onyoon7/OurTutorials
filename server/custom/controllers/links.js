var db = require('../connection')
var Link = require('../models/links');
var User = require('../models/users');
var ClassTree = require('../models/classTree')

const LinkFunction = {
		addLink: (req, res, next) => {
		let userId = req.body.userId;
		let classId = req.body.classId;
		let link = req.body.link;
		let title = req.body.title;
		let tag = req.body.tag;

		new Link({
			link: link,
			title: title,
			tag: tag
		})
		.save()
		.then((savedLink) => {
			//링크를 유저의 mylink에 넣는다.
			User.findOne({
				_id:userId
			})
			.then((user) => {
				user.myLink.push(savedLink._id);
				user
				.save()
				.then((saved) => {
					//링크를 class에 넣는다.(classTree에 링크를 class에 넣는 함수가 또 하나 있으니 사용해도 됨.)
					ClassTree.findOne({
						_id: classId
					})
					.then((foundClass) => {
						foundClass.links.push(savedLink._id);
						foundClass
						.save()
						.then((r) => {
							console.log('successfully link saved. ',r)
							res.json(r)
						})
						.catch((e) => {
							return console.error(e);
						})
					})
				})
			})
		})
		.catch(function (e) {
			return console.error(e);
		})
	},
	deleteLink: (req, res, next) => {
		let linkId = req.body.linkId;
		Link.findOne({
			_id: linkId
		})
		.remove()
		.then((result) => {
			//링크를 myLink에 가지고 있는 유저에게 가서 해당 linkId를 빼 줍니다.
			User.findOne({
				myLink : linkId
			})
			.then((user) => {
				if(!user) return console.error('No User that have this link in MyLink.')
				user.myLink.splice(user.myLink.indexOf(linkId),1);
				user.save()
				.then((savedUser) => {
					//클래스에 가서 삭제하기.
					ClassTree.findOne({
						links : linkId
					})
					.then((classNode) => {
						if(!classNode) return console.error('No Class that have this link in links.')
						classNode.links.splice(classNode.links.indexOf(linkId),1);
						classNode.save()
						.then((r) => {
							console.log('successfully deleted.');
							res.json(r);
						})
						.catch((e) => {
							console.error(e);
						})
					})
					.catch((e) =>{
						console.error(e);
					})
					 
				})
			})
			.catch((e) => {
				console.error("ERROR : deleting link from user")
			})
		})
		.catch((e) => {
			console.error('ERROR WITH DELETING LINK ',e);
		})
	},
	likeLink: (req, res, next) => {
		let linkId = req.body.linkId;
		Link.update({
			_id: linkId
		},{
			$inc: { likes: 1}
		},{})
		.then((result) => {
			console.log('successfully like updated. ',result);
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF LINK: ',e)
		})
	},
	unlikeLink: (req, res, next) => {
		let linkId = req.body.linkId;
		Link.update({
			_id: linkId
		},{
			$inc: { likes: -1}
		},{})
	
		.then((result) => {
			console.log('successfully link unlike updated. ',result);
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF LINK: ',e)
		})
	}
}


module.exports = LinkFunction
