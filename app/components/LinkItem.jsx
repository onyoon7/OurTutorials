import React, { Component, PropTypes } from 'react';

export default class LinkItem extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
      <div key = {this.props.index}>
        <h3>{this.props.title}</h3>
        <p>{this.props.link}</p>
        <p>{this.props.like}</p>
      </div>
			)
	}
}

LinkItem.protoTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired
}

