const db = require('../connection')
const Link = require('../models/links');
const User = require('../models/users');
const LinkFunc = require('./links.js');
const CourseFunc = require('./courses.js');

const UserFunction = {
	addUser : (req, res, next) => {
		let data = req.body.data;
		new User(data)
		.save()
		.then((result) => {
			console.log('successfully add user ',result);
			res.json(result);
		})
		.catch((e) => {
			return console.error('ERROR WITH SAVING NEW USER ',e);
		})
	},
	signin: (req, res, next) => {
		
	},
	addLinkToBucket: (req, res, next) => {
		let userId = req.body.userId;
		let linkId = req.body.linkId;
		User.findOne({
			_id:userId
		})
		.then((result) => {
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
	likeLinkToggle: (req, res, next) => {
		let userId = req.body.userId;
		let linkId = req.body.linkId;
		if(!linkId) return console.error('no link id.');
		//'좋아요'를 누르지 않았으면 좋아요를 누를 수 있음.
		//'좋아요'를 누르면, link의 likes가 1 증가하고 유저의 likedlink배열에 들어간다.
		//'좋아요'를 이미 누른 상태에서 이 함수를 한번 더 호출하면 좋아요 수가 감소하고 유저의 배열에서도 사라진다.
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
					LinkFunc.unlikeLink(req, res, next)
				})
				.catch((e) => {
					return console.error(e);
				})
			}else{
				result.likedLink.push(linkId);
				result.save()
				.then((update) => {
					console.log('successfully added to like ' , update);
					LinkFunc.likeLink(req, res, next)
				})
				.catch((e) => {
					return console.error(e);
				})
			}
		})
	},
	likeCourseToggle: (req, res, next) => {
		let userId = req.body.userId;
		let courseId = req.body.courseId;
		//'좋아요'를 누르지 않았으면 좋아요를 누를 수 있음.
		User.findOne({
			_id:userId
		})
		.then(result => {
			console.log(result.likedCourse.indexOf(courseId))
			if(result.likedCourse.indexOf(courseId)>-1){
				result.likedCourse.splice(result.likedCourse.indexOf(courseId),1);
				result.save()
				.then(update => {
					console.log('successfully deleted like ' , update);
					CourseFunc.unlikeCourse(req, res, next)
				})
				.catch(e => {
					return console.error(e);
				})
			}else{
				result.likedCourse.push(courseId);
				result.save()
				.then(update => {
					console.log('successfully added to like ' , update);
					CourseFunc.likeCourse(req, res, next)
				})
				.catch(e => {
					return console.error(e);
				})
			}
		})
	}
}
module.exports = UserFunction;