import React, { Component, PropTypes } from 'react';
const ENTER_KEY_CODE = 13;

export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  	}
    onSave() {
    	console.log('save');
      // const { onEntrySave, value, currentCategory} = this.props;
      // onEntrySave(currentCategory, value);
    }

    /*
     * Invokes the callback passed in as onSave, allowing this component to be
     * used in different ways. I personally think this makes it more reusable.
     */
    onChange(event) {
    	console.log('event');
      // const { onEntryChange } = this.props;
      // onEntryChange(event.target.value);
    }

    /*
     * @param  {object} event
     */
    onKeyDown(event) {
      console.log('keyDown');
      if (event.keyCode === ENTER_KEY_CODE) {
        this.onSave();
      }
    }

    render() {
      // const { className, placeholder, value } = this.props;
      return (
        <input 
          />
      );
    }
  }

  CategoryInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onEntrySave: PropTypes.func,
    onEntryChange: PropTypes.func,
    currentCategory: PropTypes.string
  };