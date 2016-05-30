import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Tutorial from 'containers/Tutorial';
import Course from 'containers/Course';
import LoginOrRegister from 'containers/LoginOrRegister';
import Dashboard from 'containers/Dashboard';
import RankBoard from 'containers/RankBoard';
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */


/*
onEnter(nextState, replace, callback?)

Called when a route is about to be entered. It provides the next router state and a function to redirect to another path. this will be the route instance that triggered the hook.

If callback is listed as a 3rd argument, this hook will run asynchronously, and the transition will block until callback is called.
*/

export default (store) => {
  // store의 user의 authenticated가 false일 경우, '/login'으로 redirect
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };
  // store의 user의 authenticated가 true일 경우 '/'로 redirect
  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      {/* Tutorial 컴포넌트는 App 컴포넌트에서 children으로 사용될 것 */}
      <IndexRoute component={Tutorial} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="course" component={Course} />
      <Route path="rank" component={RankBoard} />
      <Route path="category" component={Tutorial}/>
    </Route>
  );
};
