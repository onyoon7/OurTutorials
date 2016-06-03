import express from 'express';
import webpack from 'webpack';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import webpackDevConfig from '../webpack/webpack.config.dev-client';

const App = require('../public/assets/server');
const app = express();

function test() {
  console.log('test');
}


/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();



//============================================================

import User from './db/mongo/models/user'
import Link from './db/mongo/models/links';
import Category from './db/mongo/models/categoryTree';
import Course from './db/mongo/models/courses';
import userFunc from './db/mongo/controllers/users.js';
import linkFunc from './db/mongo/controllers/links.js';
import cateFunc from './db/mongo/controllers/categoryTree.js';
import courseFunc from './db/mongo/controllers/courses.js';
//mongoose.connect(dburl);
// userFunc.addUser({
//  email:'oh@gmail.com'
// })
//<categoryTree Query>
//1. make Category Tree by depth 2

const findCategory = (name) => {
 return new Promise((rs, rj) =>{
  Category.findOne({name:name})
  .then(category =>{
    console.log('category find ',category)
    rs(category);
    })
  })
}

const findUser = (email) => {
  return new Promise((rs, rj) =>{
    User.findOne({email: email})
    .then(user => {
      rs(user);
    })
  })
}

const makeUser =(name, email) =>{
  return new Promise((rs, rj)=>{
    new User({
      name: name,
      email: email
    })
    .then(user => {
      rs(user)
    })
  })

}

const makeDummyCategory = (name, parentName)=>{
  let req = {};
  req.body = {};
  req.body.newCategoryName = name;
  if(!parentName){
    req.body.parentId = null;
    cateFunc.addCategory(req);
  } else {
    Category.findOne({
      name: parentName
    })
    .then(p =>{
      req.body.parentId = p._id
      cateFunc.addCategory(req);
    })
  }
}

const makeDelete = (name) =>{
  Category.findOne({
    name : name
  })
  .then(r =>{
    console.log('name is ', r.name)
    let req = {};
    req.body = {};
    req.body.categoryId = r._id
    cateFunc.deleteCategryTree(req);
  })
}

const dummyLink = (category, email, link, title, tag) =>{
  let req = {};
  req.body  = {}
  findCategory(category)
  .then(cate =>{
    console.log('category is ..',cate)
    findUser(email)
    .then(user =>{
      console.log(user);
      req.body.userId = user._id;
      req.body.categoryId = cate._id;
      req.body.link = link;
      req.body.title = title;
      req.body.tag = tag;
      linkFunc.addLink(req)
    })
  })
  Category.findOne({
    name: category
  })
}

initDB();

function initDB() {
  // console.log('>>>> in initDB');
  // console.log('>>>> in initDB');
  // //delete CategoryTree collection
  Category.remove({}, function(err) {
    console.log('in CategoryTree>>>>>');
    if (err) {
      console.log("Cannot remove 'CategoryTree' collection");
    } else {
      console.log("Successfully removed 'CategoryTree' collection");
    }
  })

  // console.log('================================')
  // // delete Links collection
  Link.remove({}, function(err) {
    if (err) {
      console.log("Cannot remove 'Links' collection");
    } else {
      console.log("Successfully removed 'Links' collection");
    }
  })

  // // delete Users collection
  User.remove({}, function(err) {
    if (err) {
      console.log("Cannot remove 'Users' collection");
    } else {
      console.log("Successfully removed 'Users' collection");
    }
  })

  // // delete Courses collection
  Course.remove({}, function(err) {
    if (err) {
      console.log("Cannot remove 'Courses' collection");
    } else {
      console.log("Successfully removed 'Courses' collection");
    }
  })

  // makeDummyCategory('javasciript');
  populateDB();
}

//export default initDB ;

// populate DB with initial data

function populateDB() {


  // 1. make root categories
  // 2. make sub-categories

/*
  for (let key in sampleCategory) {
    makeDummyCategory(key);
    for (let i=0; i<sampleCategory[key].length; i++) {
      console.log('>>>>', sampleCategory[key][i], '>>>>', key)
      makeDummyCategory(sampleCategory[key][i], key)
    }
  }  
*/

  //(1) parent category(가장 상위 카테고리)
  //(2) children cateogry(상위 카테고리의 하위 카테고리 추가)
  makeDummyCategory('javascript');
  makeDummyCategory('python');


  setTimeout(function(){

    makeDummyCategory('angularjs','javascript');
    makeDummyCategory('reactjs', 'javascript');
    makeDummyCategory('nodejs','javascript');
    makeDummyCategory('django','python');
    makeDummyCategory('flask','python');
    makeDummyCategory('pyramid','python');


  }, 1000);



  // 3. make Users
  setTimeout(function() {
    let req = {};
    req.body ={
     name: 'hyeonsoo',
     email: 'ohs2033@gmail.com',
     password: '1234'
    }
    userFunc.signUp(req);
  }, 2000)


  // 4. make links
  setTimeout(function() {
    let myEmail = 'ohs2033@gmail.com';
    let myLanguage = 'angularjs';

    dummyLink(myLanguage, myEmail, 
      'http://google.com','google',['google','naver']);
    dummyLink(myLanguage, myEmail, 
      'http://stackoverflow.com','stackoverflow',['google','naver']);
    dummyLink(myLanguage, myEmail, 
      'http://yahoo.com','yahoo',['google','naver']);

    dummyLink(myLanguage, myEmail, 
      'https://facebook.com','facebook',['google','naver']);
    dummyLink(myLanguage, myEmail, 
      'https://github.com/codestates','codestates',['google','naver']);
    dummyLink(myLanguage, myEmail, 
      'https://news.ycombinator.com/','hackernews',['google','naver']);
    dummyLink(myLanguage, myEmail, 
      'https://news.ycombinator.com/','hackernews',['google','naver']);


  }, 3000);

}





//============================================================


/*
 * REMOVE if you do not need passport configuration
 */
passportConfig();

if (ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */
expressConfig(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
routesConfig(app);

/*
 * 여기서 App.default는 app/server.jsx에서 export한 render 함수이다. webpack.config.dev-server.js 때문에 public/assets/server.js로 번들된 상태다.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);

app.listen(app.get('port'));
