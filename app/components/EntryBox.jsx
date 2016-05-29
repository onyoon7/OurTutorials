import React, { PropTypes } from 'react';
import LinkTextInput from 'components/LinkTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to LinkTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move LinkTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, link}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>Tutorial for your top hack idea</h1>
      <LinkTextInput
        className={cx('input')}
        value={link}
        placeholder="Suggest a hackday idea . . ."
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  link: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
