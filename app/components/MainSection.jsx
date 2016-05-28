import React, { PropTypes } from 'react';
import LinkItem from 'components/LinkItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const MainSection = ({onIncrement, onDecrement, onDestroy, links}) => {
  const linkItems = links.map((link, key) => {
    return (
      <LinkItem index={key}
        id={link.id}
        key={key}
        text={link.text}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDestroy={onDestroy} />);
    });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Tutorial for your favorite hack day idea</h3>
      <ul className={cx('list')}>{linkItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  links: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default MainSection;
