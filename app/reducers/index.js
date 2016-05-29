import { combineReducers } from 'redux';
import user from 'reducers/user';
import category from 'reducers/category';
import link from 'reducers/link';
import message from 'reducers/message';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  category,
  user,
  link,
  message,
  routing
});

export default rootReducer;
