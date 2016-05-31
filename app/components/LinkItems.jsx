import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/link-item';
import back from 'images/back/L2.png';
import {Link} from 'react-router';


const cx = classNames.bind(styles);


export default class LinkItem extends Component {
	constructor(props){
		super(props);
	}



      render() {
          return (
              <figure className="effect-oscar  wowload fadeInUp" key = {this.props.index} >
                  <img className={cx('back')} src={back} />
                  <a href={this.props.link}>
                  <figcaption>
                    <div className={cx('ranking')}>
                        <h2>{this.props.title}  ♡ {this.props.like} </h2>
                        <p> {this.props.link}</p>
                    </div>
                  </figcaption>
                  </a>
              </figure>
          );
    }
}


	// render(){
	// 	return(
 //              <div key = {this.props.index}>

 //                <h3>{this.props.title}</h3>
 //                <p>{this.props.link}</p>
 //                <p>{this.props.like}</p>
 //              </div>
	// 	)
	//  }
 //      }


LinkItem.protoTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired
}

