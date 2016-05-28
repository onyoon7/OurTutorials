import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { wrap } from 'react-stateless-wrapper';
import MainSection from 'components/MainSection';
import LinkItem from 'components/LinkItem';

const WrappedMainSection = wrap(MainSection);

describe('MainSection', () => {
  let result;
  let linkItems;
  const linkItemData = {
    text: '',
    id: '',
    index: 0,
    onIncrement: () => {},
    onDecrement: () => {},
    onDestroy: () => {}
  };
  const stubFunctions = {
    onIncrement: () => {},
    onDecrement: () => {},
    onDestroy: () => {}
  };
  const links = [linkItemData];

  describe('Has links', () => {
    it('should render LinkItems', () => {
      result = ReactTestUtils.renderIntoDocument(<WrappedMainSection links={links} {...stubFunctions} />);
      linkItems = ReactTestUtils.scryRenderedComponentsWithType(result, LinkItem);
      expect(linkItems.length).toBe(1);
    });
  });

  describe('Does not have links', () => {
    it('should not render LinkItems', () => {
      result = ReactTestUtils.renderIntoDocument(<WrappedMainSection links={[]} {...stubFunctions} />);
      linkItems = ReactTestUtils.scryRenderedComponentsWithType(result, LinkItem);
      expect(linkItems.length).toBe(0);
    });
  });
});
