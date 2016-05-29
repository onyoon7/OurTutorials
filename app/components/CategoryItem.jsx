import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/category-item';
import back from 'images/back/1.png';

const cx = classNames.bind(styles);

export default class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.onGetChildren = this.onGetChildren.bind(this);
    this.onGetLinks = this.onGetLinks.bind(this);
  }

  onGetChildren() {
    const { id, onGetChildren } = this.props;
    onGetChildren(id);
  }

  onGetLinks() {
    const { id, onGetLinks } = this.props;
    onGetLinks(id);
  }

  render() {
    return (

          <figure className="effect-oscar  wowload fadeInUp">
              <img className={cx('back')} src={back} />
              <figcaption>
                <h3>{this.props.name}</h3>
              </figcaption>
          </figure>

      // <li className={cx('category-item')} key={this.props.id}>
      //   <div className={
      //     cx('category')
      //   } onClick={this.onGetChildren}>{this.props.name}</div>
      //   <button className={
      //     cx('button', 'decrement')
      //   } onClick={this.onGetLinks}>Get All Links from this Category</button>
      // </li>
    );
  }
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onGetChildren: PropTypes.func.isRequired,
  onGetLinks: PropTypes.func.isRequired,
};
