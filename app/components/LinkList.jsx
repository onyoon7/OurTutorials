import React, { Component, PropTypes } from 'react';
import LinkItem from 'components/LinkItems'
import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

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
      <h2 >Ranking</h2>
      <div id="works"  className=" clearfix gridChild">
            <ul>{linkItems}</ul>
      </div>
    </div>
  );
};


LinkList.PropTypes = {
  links: PropTypes.array.isRequired
};

export default LinkList;
