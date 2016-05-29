import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import { fetchCategories, getChildren, addCategory, getAllLinks } from 'actions/categories'
import { createLink, typing, incrementLike,
  decrementLike, destroyLink } from 'actions/links';
import styles from 'css/components/Tutorial';

const cx = classNames.bind(styles);

// Tutorial 컴포넌트는 'actions/links'에 정의된 여러 액션 생성자들과 state의 links, newLink을 props로 가진다.
class Tutorial extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method

  // 서버사이드 렌더링에서 처음에 필요한 작업이 need에 정의 돼 있는 상태.
  static need = [  // eslint-disable-line
    fetchCategories
  ]

  render() {
    const {newLink, links, typing, createLink, destroyLink, incrementLike, decrementLike } = this.props;
    return (
      <div className={cx('Tutorial')}>
        <EntryBox link={newLink}
          onEntryChange={typing}
          onEntrySave={createLink} />
        <MainSection categories={categories}
          onGetChildren = { getChildren }
          onGetLinks = { getAllLinks }/>
        <Scoreboard links={links} />
      </div>
    );
  }
}

Tutorial.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string,
  getChildren: PropTypes.func.isRequired,
  // addCategory: PropTypes.func.isRequired,
  getAllLinks: PropTypes.func.isRequired,

  typing: PropTypes.func.isRequired,
  createLink: PropTypes.func.isRequired,


  // destroyLink: PropTypes.func.isRequired,
  // incrementLike: PropTypes.func.isRequired,
  // decrementLike: PropTypes.func.isRequired,
  // links: PropTypes.array.isRequired,
  // newLink: PropTypes.string
};

function mapStateToProps(state) {
  return {
    // links: state.link.links,
    // newLink: state.link.newLink
    categories: state.category.categories,
    currentCategory: state.category.currentCategory
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563

// Tutorial 컴포넌트를 리덕스 스토어와 연결한 새 컴포넌트를 export하는데, 이 때 connect된 객체가 가지는 props에는 액션이 dispatch로 wrap 돼 있기 떄문에 호출할 경우 바로 dispatch가 일어난다.
// export default connect(mapStateToProps, { createLink, typing, incrementLike, decrementLike, destroyLink })(Tutorial);

export default connect(mapStateToProps, {
  createLink, typing, getChildren, addCategory, getAllLinks
})(Tutorial);
