import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import MainSection from 'components/MainSection';
import EntryBox from 'components/EntryBox';
import { fetchCategories, getChildren, addCategory, getAllLinks, typing } from 'actions/categories'
import styles from 'css/components/Tutorial';

const cx = classNames.bind(styles);

// Tutorial 컴포넌트는 'actions/links'에 정의된 여러 액션 생성자들과 state의 links, newLink을 props로 가진다.
class Tutorial extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method

  // 서버사이드 렌더링에서 처음에 필요한 작업이 need에 정의 돼 있는 상태.
  constructor (props){
    super();
    console.log('props. in constructor', props)
  }

  static need =[ 
          fetchCategories
          ]
          
  render() {  
    console.log('props in rendere', this.props)
    console.log('need in renderer..', this.need)
    const {currentCategory, newCategory, categories, getChildren, getAllLinks, addCategory, typing, url } = this.props;
    return (
      <div className={cx('Tutorial')}>
        <MainSection categories={categories}
          onGetChildren = {getChildren}
          onGetLinks = {getAllLinks}
          />
          <EntryBox newCategory = {newCategory}
            currentCategory = {currentCategory}
            onEntryChange = {typing}
            onEntrySave = {addCategory}/>
      </div>
    );
  }
}

Tutorial.propTypes = {
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

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563

// Tutorial 컴포넌트를 리덕스 스토어와 연결한 새 컴포넌트를 export하는데, 이 때 connect된 객체가 가지는 props에는 액션이 dispatch로 wrap 돼 있기 떄문에 호출할 경우 바로 dispatch가 일어난다.

export default connect(mapStateToProps, {
  getChildren, addCategory, getAllLinks, typing}
)(Tutorial);
