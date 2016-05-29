require('babel-preset-es2015')

const mongoose = require('mongoose');
const dburl = 'mongodb://localhost/ReactWebpackNode'

var User = require('./models/user');
var Link = require('./models/links');
var Category = require('./models/categoryTree');
var Course = require('./models/courses');

var userFunc = require('./controllers/users.js');
var linkFunc = require('./controllers/links.js');
var cateFunc = require('./controllers/categoryTree.js');
var courseFunc = require('./controllers/courses.js');

mongoose.connect(dburl);


// userFunc.addUser({
// 	email:'oh@gmail.com'
// })

//<categoryTree Query>
//1. make Category Tree by depth 2
const makeDummyCategory = (name, parentName)=>{
	let req = {};
	req.body = {};
	req.body.newCategoryName = name;
	if(!parentName){

		req.body.parentId = null;

		cateFunc.addCategory(req);
	}else{
		Category.findOne({
			name: parentName
		})
		.then(p =>{
			req.body.parentId = p._id
			cateFunc.addCategory(req);
		})

	}

}

//(1) parent
// makeDummyCategory('javascript');
// makeDummyCategory('python');
// makeDummyCategory('lisp');
// makeDummyCategory('C++');
// makeDummyCategory('ruby');

//(2) childrencateogry
// makeDummyCategory('javascript','server');
// makeDummyCategory('client','javascript');
// makeDummyCategory('db','javascript');
// makeDummyCategory('datastructure','javascript');
// makeDummyCategory('algorithm','javascript');
// makeDummyCategory('client','python');
// makeDummyCategory('db','python');
// makeDummyCategory('datastructure','python');
// makeDummyCategory('algorithm','python');
// makeDummyCategory('client','ruby');
// makeDummyCategory('db','ruby');
// makeDummyCategory('datastructure','ruby');
// makeDummyCategory('algorithm','ruby');

// 2. make children
// let req = {};
// req.body = {};
// categoryTree.findOne({name: 'express.js'})
// .then( (result) => {
// 	console.log(result)
// 	req.body.parentId = result._id;
// 	req.body.newCategoryName = 'middleware';
// 		cateFunc.addCategory(req)
// })

//3.get ALL Links

// let req = {};
// req.body = {};
// categoryTree.findOne({name: 'server'})
// .then( (result) => {
// 	console.log(result)
// 	req.body.categoryId = result._id;
// 	cateFunc.getAllLinks(req)
// })

//4.add dummy User
// userFunc.addUser({
// 	name: 'hyeonsoo',
// 	email: 'ohs2033@gmail.com',
// 	password: '1234'
// })




//<link query>
//4. add Link to Category and user
// let req = {};
// req.body = {};


// categoryTree.findOne({name: 'express.js'})
// .then( (CategoryNode) => {
// 	// console.log(CategoryNode);
// 	User.findOne({name: 'hyeonsoo'})
// 	.then ( (user) => {
// 		// console.log(user);
// 		req.body.userId = user._id;
// 		req.body.categoryId = CategoryNode._id;
// 		req.body.link = 'http://es10.com/';
// 		req.body.title = 'es111 nodejs site.';
// 		req.body.tag = ['nodejs', 'official', 'site'];
// 		linkFunc.addLink(req)
// 	})
// })

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


//6. make course with nested object.

// let req = {};
// req.body = {};
// req.body.courseData ={
// 	title: '2지우기용2',
// 	summary: '지우기용입니다.',
// 	contents: [
// 			{
// 				title: '첫 번째 단원 ',
// 				links: ['naver.com','mongodb.com']
// 			},{
// 				title: '두 번쨰 단원',
// 				summary: '좀 어려워요 여긴',
// 				links: ['google.com', 'stackoverflow.com']
// 			}
// 			]
// }

// User.findOne({name:'hi'})
// .then(user =>{
// 	categoryTree.findOne({
// 		name: 'server'
// 	})
// 	.then(cn =>{
// 		req.body.userId = user._id;
// 		req.body.categoryId = cn._id;
// 		courseFunc.addCourse(req)
// 	})
// })

//7.delete course

// let req = {};
// req.body = {};

// Course.findOne({
// 	title: '2지우기용2'
// })
// .then(r=>{
// 	req.body.courseId = r._id
// 	courseFunc.deleteCourse(req)
// })

//8. like course

// let req = {};
// req.body = {};

// Link.findOne({
// 	title: 'express official site.'
// })
// .then(r => {
// 	console.log(r)
// 	User.findOne({
// 		name:'hi'
// 	})
// 	.then(user => {
// 		console.log(user);
// 		req.body.linkId = r._id
// 		req.body.userId = user._id
// 		userFunc.likeLinkToggle(req)
// 	})
// })


//9.get all courses

// let req = {};
// req.body = {};
// categoryTree.findOne({name: 'server'})
// .then( (result) => {
// 	console.log(result)
// 	req.body.categoryId = result._id;
// 	cateFunc.getAllCourses(req)
// })



