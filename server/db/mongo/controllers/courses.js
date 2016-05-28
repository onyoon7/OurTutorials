const ClassTree = require('../models/classTree');
const Course = require('../models/courses');
const User = require('../models/user')


module.exports = {
	addCourse : (req, res, next) => {
		//코스 만들고, 만들어진 코스의 아이디를 해당 클래스와 유저의 mycourse에 넣는다.
		let userId = req.body.userId;
		let courseData = req.body.courseData; 
		let classId = req.body.classId//nested object형태를 띈 contents입니다.
		console.log(userId, courseData, classId);
		new Course(
			courseData
		)
		.save()
		.then(savedCourse =>{
			User.findOne({
				_id: userId
			})
			.then(user => {
				user.myCourse.push(savedCourse._id);
				user.save()
				.then(user =>{
					ClassTree.findOne({
						_id: classId
					})
					.then(classNode =>{
						classNode.courses.push(savedCourse._id);
						classNode.save()
						.then(classNode =>{
							console.log('successfully saved.', classNode.courses, user.myCourse);
							res.status(200).json(savedCourse);
						})
						.catch(e => console.error(e))
					})
				})
				.catch(e => console.error(e))
			})

		})
		.catch(e => console.error(e))
	},	
	deleteCourse : (req, res, next) => {
		let courseId = req.body.courseId;
		Course.findOne({
			_id: courseId
		})
		.remove()
		.then(removed => {
			User.findOne({
				myCourse: courseId
			})
			.then(user =>{
				user.myCourse.splice(user.myCourse.indexOf(courseId),1);
				user.save()
				.then( savedUser=> {
					ClassTree.findOne({
						courses: courseId
					})
					.then(classNode =>{
						classNode.courses.splice(classNode.courses.indexOf(courseId),1);
						classNode.save()
						.then(fn=>{
							res.status(200).json({message: 'completely deleted'});
						})
					})
					.catch(e =>console.log(e))
				})
				.catch(e => console.error(e))
			})
			.catch(e =>console.log(e))

		})
		.catch(e => console.log(e))
	},

	likeCourse: (req, res, next) => {
		let courseId = req.body.courseId;
		Course.update({
			_id: courseId
		},{
			$inc: { likes: 1}
		},{})
		.then((result) => {
			res.status(200).json({ message: 'course liked.'});
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF course: ',e)
		})
	},
	unlikeCourse: (req, res, next) => {
		let courseId = req.body.courseId;
		Course.update({
			_id: courseId
		},{
			$inc: { likes: -1}
		},{})
		.then((result) => {
			res.status(200).json({ message: 'course unliked.'});
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF course: ',e)
		})
	}
}