import React, { Component, PropTypes } from 'react';
import LinkItem from 'components/LinkItem'

const LinkList = ({links}) => {
  const linkItems = links.map((item, key) => {
    return (
      <LinkItem index={key}
        id={item._id}
        key={key}
        title={item.title}
        link={item.link}
        like={item.like} />);
  });

  return (
    <div>
      <h2>Ranking</h2>
      <ul>
        {linkItems}
      </ul>
    </div>
  );
};


LinkList.PropTypes = {
  links: PropTypes.array.isRequired
};

export default LinkList;
