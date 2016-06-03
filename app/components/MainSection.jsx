import React, { PropTypes } from 'react';
import CategoryItem from 'components/CategoryItem';
import CategoryInput from 'components/CategoryInput'
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const MainSection = ({onGetChildren, onGetLinks, categories, currentCategory}) => {
  const categoryItems = categories.map((category, key) => {
    return (
      <CategoryItem index={key}
        id={category._id}
        key={key}
        name={category.name}
        category={category}
        onGetChildren={onGetChildren}
        onGetLinks={onGetLinks}
        currentCategory={currentCategory} />);
    });

  return (
    <div className={cx('main-section')}>
      {/*<h3 className={cx('header')}>Choose A Category</h3>*/}
      <div id="works"  className=" clearfix grid">
      <ul className={cx('list')}>{categoryItems}</ul>
      </div>
    </div>
  );
};

MainSection.propTypes = {
  categories: PropTypes.array.isRequired,
  onGetChildren: PropTypes.func.isRequired,
  onGetLinks: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired
};

export default MainSection;
