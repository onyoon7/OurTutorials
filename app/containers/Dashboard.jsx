import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/Dashboard';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

const Dashboard = () => {
  return (
    <div className={cx('Dashboard')}>
       <div className={cx('header')}>Welcome to Dashboard</div>
          <div className={cx('description')}>
            <p>dash -ing =333 =333
            </p>
        </div>
    </div>
    );
};

export default Dashboard;
