import React, { Component, PropTypes } from 'react';



export default class RankItem extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
      <div key = {this.props.index}>
        <p>{this.props.title}</p>
        <p>{this.props.link}</p>
        <p>{this.props.like}</p>
      </div>
			)
	}
}

RankItem.protoTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired
}

