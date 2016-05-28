/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const classController = controllers && controllers.classTrees;
const linkController = controllers && controllers.links;
const courseController = controllers && controllers.courses;




export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    app.post('/likelink', usersController.likeLinkToggle);
    app.post('/likecourse', usersController.likeCourseToggle);
    app.post('/bucket', usersController.addLinkToBucket);

  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  if (classController){
    app.post('/class', classController.addClass);
    app.get('/class', classController.getChildrenClasses);
    app.get('/class/link', classController.getAllLinks);
    app.get('/class/course', classController.getAllCourses);
  }else{
    console.warn(unsupportedMessage('class routes'));
  }
  
  if(linkController){
    app.post('/link', linkController.addLink);
    app.delete('/link', linkController.deleteLink);
  }else{
    console.warn(unsupportedMessage('link routes'));
  }
  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', classController.addClass);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn(unsupportedMessage('topics routes'));
  }
};
