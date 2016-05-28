var db = require('./connection')
var User = require('./models/users');
var Link = require('./models/links');
var ClassTree = require('./models/classTree');
var Course = require('./models/courses');

var userFunc = require('./controllers/users.js');
var linkFunc = require('./controllers/links.js');
var classFunc = require('./controllers/classTree.js');
var courseFunc = require('./controllers/courses.js');




// userFunc.addUser({
// 	email:'oh@gmail.com'
// })

//<ClassTree Query>
//1. make class Tree by depth 2
// let req = {};
// req.body = {};
// req.body.parentId = null;
// req.body.newClassName = 'javascript'
// classFunc.addClass(req);


// 2. make children
// let req = {};
// req.body = {};
// ClassTree.findOne({name: 'express.js'})
// .then( (result) => {
// 	console.log(result)
// 	req.body.parentId = result._id;
// 	req.body.newClassName = 'middleware';
// 		classFunc.addClass(req)
// })

//3.get ALL Links

// let req = {};
// req.body = {};
// ClassTree.findOne({name: 'server'})
// .then( (result) => {
// 	console.log(result)
// 	req.body.id = result._id;
// 	classFunc.getAllLinks(req)
// })

//4.add dummy User
// userFunc.addUser({
// 	name: 'hyeonsoo',
// 	email: 'ohs2033@gmail.com',
// 	password: '1234'
// })




//<link query>
//4. add Link to class and user
let req = {};
req.body = {};


ClassTree.findOne({name: 'express.js'})
.then( (classNode) => {
	// console.log(classNode);
	User.findOne({name: 'hyeonsoo'})
	.then ( (user) => {
		// console.log(user);
		req.body.userId = user._id;
		req.body.classId = classNode._id;
		req.body.link = 'http://es10.com/';
		req.body.title = 'es111 nodejs site.';
		req.body.tag = ['nodejs', 'official', 'site'];
		linkFunc.addLink(req)
	})	
})

//5.delete Link.
// let req = {};
// req.body = {};
// req.body.linkId;
// Link.findOne({
// 	title:'es8 nodejs site.'
// })
// .then((link) => {
// 	console.log(link);
// 	req.body.linkId = link._id
// 	linkFunc.deleteLink(req)
// })




// let a = new Promise(
// 	(resolve, reject)=>{
// 		if(true) resolve(3);
// 		else reject(4);
// 	})



// a.then(b => console.log(b))
// .catch(e => console.log(e))

// new Promise((resolve, reject) => {
// 	User.findOne({name:'hyeonsoo'})
// 	.then(user => {
// 		resolve(user);
// 	})
// 	.catch((e) => {
// 		reject(e)
// 	})
// })
// .then(user => {
// 	return new Promise((resolve, reject) => {		
// 		Link.findOne({_id:user.myLink[0]})
// 		.then(Link => resolve(Link))
// 		})
// 	})
// 	.catch(e => {
// 	return console.log(e)
// })
// .then(link => {
// 	console.log(link)
// })

(req, res, next) =>{
		let userId = req.body.userId;
		let classId = req.body.classId;
		let link = req.body.link;
		let title = req.body.title;
		let tag = req.body.tag;
		new Promise((resolve, reject) => {
			new Link({
				link: link,
				title: title,
				tag: tag
			})
			.save()
			.then(savedLink => resolve(savedLink))
			.catch(e => console.error(e))
		})
		.then(savedLink =>{
			console.log('savedLink is', savedLink)
			return new Promise((resolve,reject) => {
				User.findOne({
					_id:userId
				})
				.then(user => resolve(user, savedLink))
				.catch(e => console.error(e))
			})
		})
		.then((user, savedLink) => {
			console.log('savedUser', user,savedLink);
			return new Promise((resolve, reject) => {
				user.myLink.push(savedLink._id);
				user
				.save()
				.then(saved => resolve(saved))
				.catch(e => console.error(e))
			})
		})
		.then(saved => {
			return new Promise((resolve, reject) => {
				ClassTree.findOne({
					_id: classId
				})
				.then(classNode => resolve(classNode))
			})
		})
		.then(classNode => {
			return new Promise((resolve, reject) => {
				classNode.links.push(savedLink._id);
				classNode
				.save()
				.then(r => resolve(r))
			})
		})
		.then(r =>{
			console.log('successfully saved. ',r)
		})
},





