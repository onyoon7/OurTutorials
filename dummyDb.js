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


//1. make class Tree by depth 2
// classFunc.addClass(null, 'javascript');
// ClassTree.findOne({name: 'javascript'})
// .then( (result) => {
// 		classFunc.addClass(result._id, 'server')
// })


//2. add link to class Tree
classFunc.getClassTree();