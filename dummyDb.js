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




//2. add link to class Tree
// classFunc.getClassTree();