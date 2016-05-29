import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import Message from 'containers/Message';
import classNames from 'classnames/bind';
import styles from 'css/main';

const cx = classNames.bind(styles);


/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({children}) => {
  // console.log('children.props.route: ',children.props.route);

  // console.log('--------------------------')

  // console.log('children.props.route.component.WrappedComponent.propTypes',children.props.route.component.WrappedComponent.propTypes);

  // console.log('--------------------------')

  // console.log('children.props.route.component.propTypes',children.props.route.component.propTypes)

  // console.log('--------------------------')

  // console.log('children.props.route.component.contextTypes',children.props.route.component.contextTypes)

  // console.log('--------------------------')

  // console.log('children.props.routes: ',children.props.routes);

  // console.log('--------------------------')

  // console.log('children.props.routes[0].indexRoute',children.props.routes[0].indexRoute);

  // console.log('--------------------------')

  // console.log('children.props.routes[1].component.WrappedComponent',children.props.routes[1].component.WrappedComponent);

  // console.log('--------------------------')

  // console.log('children.props.routes[1].component.contextTypes',children.props.routes[1].component.contextTypes);

  // console.log('--------------------------')

  // console.log('children.props.routes[1].component.propTypes',children.props.routes[1].component.propTypes);

  // console.log('--------------------------')

  // console.log('children.type.WrappedComponent.propTypes', children.type.WrappedComponent.propTypes);

  return (
    <div className={cx('app')}>
      <Navigation />
      <Message />
        {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
