import CategoryTree from '../models/categoryTree';
import Course from '../models/courses';
import User from '../models/user';


module.exports = {
	addCourse : (req, res, next) => {
		//코스 만들고, 만들어진 코스의 아이디를 해당 클래스와 유저의 mycourse에 넣는다.
		let userId = req.body.userId;
		let courseData = req.body.courseData;
		let categoryId = req.body.categoryId//nested object형태를 띈 contents입니다.
		console.log(userId, courseData, categoryId);
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
					CategoryTree.findOne({
						_id: categoryId
					})
					.then(categoryNode =>{
						categoryNode.courses.push(savedCourse._id);
						categoryNode.save()
						.then(categoryNode =>{
							console.log('successfully saved.', categoryNode.courses, user.myCourse);
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
					CategoryTree.findOne({
						courses: courseId
					})
					.then(categoryNode =>{
						categoryNode.courses.splice(categoryNode.courses.indexOf(courseId),1);
						categoryNode.save()
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
			$inc: { like: 1}
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
			$inc: { like: -1}
		},{})
		.then((result) => {
			res.status(200).json({ message: 'course unliked.'});
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF course: ',e)
		})
	}
}
