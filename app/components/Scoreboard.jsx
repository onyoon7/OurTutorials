import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/scoreboard';

const cx = classNames.bind(styles);

const Scoreboard = ({links}) => {
  const linkListItems = links.map((link, key) => {
    return (
    <li className={cx('item')} key={key}>
      <span className={cx('link')}>{link.text}</span>
      <span className={cx('like')}>{link.like}</span>
    </li>);
  });
  return (
    <div className={cx('scoreboard')}>
      <h3 className={cx('header')}>Tutorial like</h3>
      <ul className={cx('list')}>
        {linkListItems}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  links: PropTypes.array.isRequired
};

export default Scoreboard;
