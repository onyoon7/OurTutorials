import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/category-item';
import back from 'images/back/1.png';
import {Link} from 'react-router';

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
    if(!this.props.currentCategory){
      // console.log('currentCategory: ',this.props.currentCategory);
      return(
        <Link to ={'/category'}>
          <figure className="effect-oscar  wowload fadeInUp" key = {this.props.id} onClick={this.onGetChildren}>
              <img className={cx('back')} src={back} />
              <figcaption>
                <h2>{this.props.name}</h2>
              </figcaption>
          </figure>
        </Link>
      );
    }else{
      // console.log('currentCategory: ',this.props.currentCategory);
      return(
        <Link to ={'/rank'}>
          <figure className="effect-oscar  wowload fadeInUp" key = {this.props.index} onClick={this.onGetLinks}>
              <img className={cx('back')} src={back} />
              <figcaption>
                <h2>{this.props.name} </h2>
              </figcaption>
          </figure>
        </Link>
      );
    }

  }
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onGetChildren: PropTypes.func.isRequired,
  onGetLinks: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired
};
