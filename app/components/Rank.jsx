import React, { Component, PropTypes } from 'react';
import RankItem from 'components/RankItem'

class Rank extends Component {
  const rankItems = this.props.links.map((item, key) => {
    return (
      <RankItem index={key}
        id={item._id}
        key={key}
        title={item.title}
        link={item.link}
        like={item.like} />);
  });

  render() {
    return (
      <div>
        <h2>Ranking</h2>
        <ul>
          {rankItems}
        </ul>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    links: state.category.links
  }
}

export default connect(mapStateToProps)(Rank);
