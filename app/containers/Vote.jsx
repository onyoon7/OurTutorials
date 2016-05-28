import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import { createTopic, typing, incrementCount,
  decrementCount, destroyTopic, fetchTopics } from 'actions/topics';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

// Vote 컴포넌트는 'actions/topics'에 정의된 여러 액션 생성자들과 state의 topics, newTopic을 props로 가진다.
class Vote extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method

  // 서버사이드 렌더링에서 처음에 필요한 작업이 need에 정의 돼 있는 상태.
  static need = [  // eslint-disable-line
    fetchTopics
  ]

  render() {
    const {newTopic, topics, typing, createTopic, destroyTopic, incrementCount, decrementCount } = this.props;
    return (
      <div className={cx('vote')}>
        <EntryBox topic={newTopic}
          onEntryChange={typing}
          onEntrySave={createTopic} />
        <MainSection topics={topics}
          onIncrement={incrementCount}
          onDecrement={decrementCount}
          onDestroy={destroyTopic} />
        <Scoreboard topics={topics} />
      </div>
    );
  }
}

Vote.propTypes = {
  topics: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newTopic: PropTypes.string
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563

// Vote 컴포넌트를 리덕스 스토어와 연결한 새 컴포넌트를 export하는데, 이 때 connect된 객체가 가지는 props에는 액션이 dispatch로 wrap 돼 있기 떄문에 호출할 경우 바로 dispatch가 일어난다.
export default connect(mapStateToProps, { createTopic, typing, incrementCount, decrementCount, destroyTopic })(Vote);
