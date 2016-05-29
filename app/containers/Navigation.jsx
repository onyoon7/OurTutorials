import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import logo from 'images/logo.png';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (

      <nav className={cx('navbar-collapse  collapse')} role="navigation">
        <Link to="/"
          className={cx('logo')}
          activeClassName={cx(logo)}><img className={cx('logo1')} src={logo} /></Link>

          { user.authenticated ? (

            <Link onClick={logOut}
              className={cx('item')} to="/">Logout</Link>
          ) : (
            <Link className={cx('item')} to="/login">Log in</Link>
          )}
          <Link className={cx('item')} to="/dashboard">Dashboard</Link>
          <Link to="/course" className={cx('item')} activeClassName={cx('active')}>Course</Link>
      </nav>

    );


};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
