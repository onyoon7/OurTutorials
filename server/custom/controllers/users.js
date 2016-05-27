const db = require('../connection')
const Link = require('../models/links');
const User = require('../models/users');
const LinkFunc = require('./links.js')

const UserFunction = {
	addUser : (data) => {
		new User(data)
		.save()
		.then((result) => {
			console.log('successfully add user ',result)
		})
		.catch((e) => {
			return console.error('ERROR WITH SAVING NEW USER ',e);
		})
	},
	addLinkToBucket: (userId, linkId) => {
		User.findOne({
			_id:userId
		})
		.then( (result) => {
			result.bucketLink.push(linkId);
			result.save()
			.then((update) => {
				console.log('successfully added to bucket ' , update);

			})
			.catch((e) => {
				return console.error(e);
			})
		})
	},
	likeLinkToggle: (userId, linkId) => {
		User.findOne({
			_id:userId
		})
		.then( (result) => {
			console.log(result.likedLink.indexOf(linkId))
			if(result.likedLink.indexOf(linkId)>-1){
				result.likedLink.splice(result.likedLink.indexOf(linkId),1);
				result.save()
				.then((update) => {
					console.log('successfully deleted like ' , update);
					LinkFunc.unlikeLink(linkId)
				})
				.catch((e) => {
					return console.error(e);
				})
			}else{
				result.likedLink.push(linkId);
				result.save()
				.then((update) => {
					console.log('successfully added to like ' , update);
					LinkFunc.likeLink(linkId)
				})
				.catch((e) => {
					return console.error(e);
				})
			}
		})
	},
	likeCourse: () => {
	}
}

//dummy data.
// User.findOne({
// 	email:'glnt1@naver.com'
// })
// .then((result) =>{
// 	Link.findOne({
// 		title:'google'
// 	})
// 	.then((link) => {
// 		UserFunction.likeLink(result._id, link._id)
// 	})
	
// })

module.exports = UserFunction;