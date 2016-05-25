//'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react/lib/ReactTestUtils');
import App from '../src/App.js';

describe('App', () => {
  it('renders an h1', () => {
    const component = TestUtils.renderIntoDocument(<App />);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(
        component, 'h1'
    );
    const text = ReactDOM.findDOMNode(h1).textContent;
    //for some reason, the line below doesn't work.
    //expect(ReactDOM.findDOMNode(h1)).to.eql('Hello');
    expect(text).to.equal('Hello, world. Wow');
  });
});
