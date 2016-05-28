var db = require('../connection')
var Link = require('../models/links');
var User = require('../models/users');

const LinkFunction = {
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
		.then( (result) => {
			console.log('successfully removed: ', result)
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
			console.log('successfully updated. ',result);
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
			console.log('successfully updated. ',result);
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF LINK: ',e)
		})
	}
}

module.exports = LinkFunction;

