import React from 'react'
import {render} from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './modules/App'
import Course from './modules/Course'
import Tuto from './modules/Tuto'
import Login from './modules/Login'
import Choose from './modules/Choose'
import ChooseChild from './modules/ChooseChild'
import Signup from './modules/Signup'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
      {/* make them children of 'App'*/}
      <Route path="/course" component={Course}/>
      <Route path="/tuto" component={Tuto}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/choose" component={Choose}/>
      <Route path="/chooseChild" component={ChooseChild}/>

  </Router>
), document.getElementById('app'))
