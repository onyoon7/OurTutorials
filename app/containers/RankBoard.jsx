import React, { Component, PropTypes } from 'react';
import LinkList from 'components/LinkList'
import { connect } from 'react-redux';

class RankBoard extends Component {
  render() {
    const {links} = this.props;

    return (
      <div>
        <LinkList links={links}/>
      </div>
    )
  }
}

RankBoard.propTypes = {
  links: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    links: state.category.links
  }
}

export default connect(mapStateToProps)(RankBoard);
