import User from '../models/user';
import passport from 'passport';
import Link from '../models/links';
import LinkFunc from './links.js';
import CourseFunc from './courses.js';

const UserFunction = {
	//db preset
	login: (req, res, next) =>{
	  // Do email and password validation for the server
	  passport.authenticate('local', (authErr, user, info) => {
	    if (authErr) return next(authErr);
	    if (!user) {
	      return res.status(401).json({ message: info.message });
	    }
	    // Passport exposes a login() function on req (also aliased as
	    // logIn()) that can be used to establish a login session
	    return req.logIn(user, (loginErr) => {
	      if (loginErr) return res.status(401).json({ message: loginErr });
	      return res.status(200).json({
	        message: 'You have been successfully logged in.'
	      });
	    });
	  })(req, res, next);
	},
	logout: (req, res) => {
	  // Do email and password validation for the server
	  req.logout();
	  res.redirect('/');
	},
	signUp: (req, res, next) => {
	  const user = new User({
	    email: req.body.email,
	    password: req.body.password
	  });
	  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
	    if (existingUser) {
	      return res.status(409).json({ message: 'Account with this email address already exists!' });
	    }
	    return user.save((saveErr) => {
	      if (saveErr) return next(saveErr);
	      if (!req.logIn) return;//for dummy
	      return req.logIn(user, (loginErr) => {
	        if (loginErr) return res.status(401).json({ message: loginErr });
	        return res.status(200).json({
	          message: 'You have been successfully logged in.'
	        });
	      });
	    });
	  });
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
				return res.status(200).json({ message: 'successfully added to bucket.'})
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
		//'좋아요'를 누르면, link의 like가 1 증가하고 유저의 likedlink배열에 들어간다.
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
					LinkFunc.unlikeLink(req, res, next)
				})
				.catch((e) => {
					return console.error(e);
				})
			}else{
				result.likedLink.push(linkId);
				result.save()
				.then((update) => {
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
					CourseFunc.unlikeCourse(req, res, next)
				})
				.catch(e => {
					return console.error(e);
				})
			}else{
				result.likedCourse.push(courseId);
				result.save()
				.then(update => {
					CourseFunc.likeCourse(req, res, next)
				})
				.catch(e => {
					return console.error(e);
				})
			}
		})
	}
}

export default UserFunction
