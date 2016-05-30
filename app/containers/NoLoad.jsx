import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import MainSection from 'components/MainSection';
import EntryBox from 'components/EntryBox';
import { fetchCategories, getChildren, addCategory, getAllLinks, typing } from 'actions/categories'
import styles from 'css/components/Tutorial';

const cx = classNames.bind(styles);

class NoLoad extends Component {
  render() {
    const {currentCategory, newCategory, categories, getChildren, getAllLinks, addCategory, typing, url } = this.props;
    return (
      <div className={cx('Tutorial')}>
        <MainSection categories={categories}
          onGetChildren = {getChildren}
          onGetLinks = {getAllLinks}
          currentCategory = {currentCategory}
          />
          <EntryBox newCategory = {newCategory}
            currentCategory = {currentCategory}
            onEntryChange = {typing}
            onEntrySave = {addCategory}/>
      </div>
    );
  }
}

NoLoad.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string,
  newCategory: PropTypes.string,
  getChildren: PropTypes.func.isRequired,
  getAllLinks: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  typing: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    url : state.routing,
    categories: state.category.categories,
    newCategory: state.category.newCategory,
    currentCategory: state.category.currentCategory
  };
}

export default connect(mapStateToProps, {
  getChildren, addCategory, getAllLinks, typing}
)(NoLoad);
