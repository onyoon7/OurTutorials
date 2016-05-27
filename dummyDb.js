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
// //4. add Link to class and user
// let req = {};
// req.body = {};


// ClassTree.findOne({name: 'express.js'})
// .then( (classNode) => {
// 	// console.log(classNode);
// 	User.findOne({name: 'hyeonsoo'})
// 	.then ( (user) => {
// 		// console.log(user);
// 		req.body.userId = user._id;
// 		req.body.classId = classNode._id;
// 		req.body.link = 'http://nodejs.com/';
// 		req.body.title = 'express nodejs site.';
// 		req.body.tag = ['nodejs', 'official', 'site'];
// 		linkFunc.addLink(req)
// 	})	
// })

// //5.delete Link.
// let req = {};
// req.body = {};
// req.body.linkId;
// Link.findOne({
// 	title:'express nodejs site.'
// })
// .then((link) => {
// 	console.log(link);
// 	req.body.linkId = link._id
// 	linkFunc.deleteLink(req)
// })



//2. add link to class Tree
// classFunc.getClassTree();