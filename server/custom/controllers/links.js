var db = require('../connection')
var Link = require('../models/links');
var User = require('../models/users');

const LinkFunction = {
	getLinkFromClass: () => {
		//특정 클래스에 속해있는 링크를 가져오기.
	},
	addLink: (userId, data) => {
		new Link(data)
		.save()
		.catch(function (e) {
			return console.error(e);
		})
		.then((result) => {
			User.findOne({
				_id:userId
			})
			.then((user) => {
				user.myLink.push(result._id);
				user
				.save()
				.then((res) => {
					console.log('suceessfuly add link to user');
				})
			})
			console.log('link is saved. ', result);
		})
	},
	deleteLink: (linkId) => {
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
				if(!user) return console.error('NO User that have this link in MyLink.')
				user.myLink.splice(user.myLink.indexOf(linkId),1);
				user.save()
				.then((savedUser) => {
					console.log('successfully delete link from user')
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
	likeLink: (linkId) => {
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
	unlikeLink: (linkId) => {
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
