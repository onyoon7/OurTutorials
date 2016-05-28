/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/links';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Link Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const link = 'A time machine';
    const id = md5.hash(link);
    const data = {
      id,
      like: 0,
      text: link
    };

    const initialState = {
      link: {
        links: [],
        newlink: ''
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_LINK_REQUEST,
          id,
          like: 0,
          text: data.text
        }, {
          type: types.CREATE_LINK_SUCCESS
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createLink(link))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .then(done).catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_LINK_REQUEST,
          id,
          like: 0,
          text: data.text
        }, {
          type: types.CREATE_LINK_FAILURE,
          id,
          error: 'Oops! Something went wrong and we couldn\'t create your link'
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your link'}));

      const store = mockStore(initialState);
      store.dispatch(actions.createLink(link))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .then(done).catch(done);
    });

    it('dispatches a duplicate action for a duplicate link', () => {
      initialState.link.links.push(data);

      const expectedActions = [
        {
          type: types.CREATE_LINK_DUPLICATE
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.createLink(link));
      expect(store.getActions()).toEqual(expectedActions);
      initialState.link.links.pop();
    });
  });
  describe('Action creator unit tests', () => {
    const index = 0;
    const link = 'A time machine';
    const id = md5.hash(link);
    const data = {
      id,
      like: 0,
      text: link
    };
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create an action object to increment the count', () => {
      const expectedAction = {
        type: types.INCREMENT_LIKE,
        index
      };
      expect(actions.increment(index)).toEqual(expectedAction);
    });

    it('should create an action object to decrement count', () => {
      const expectedAction = {
        type: types.DECREMENT_LIKE,
        index
      };
      expect(actions.decrement(index)).toEqual(expectedAction);
    });

    it('should create an action object to destroy a link', () => {
      const expectedAction = {
        type: types.DESTROY_LINK,
        index
      };
      expect(actions.destroy(index)).toEqual(expectedAction);
    });

    it('should create an action object with a new link', () => {
      const expectedAction = {
        type: types.TYPING,
        newLink: data.text
      };
      expect(actions.typing(data.text)).toEqual(expectedAction);
    });

    it('should create an action object with a new link request', () => {
      const expectedAction = {
        type: types.CREATE_LINK_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text
      };
      expect(actions.createLinkRequest(data)).toEqual(expectedAction);
    });

    it('should create an action object on a new link success', () => {
      const expectedAction = {
        type: types.CREATE_LINK_SUCCESS
      };
      expect(actions.createLinkSuccess()).toEqual(expectedAction);
    });

    it('should create an action object on a new link failure', () => {
      const dataFail = Object.assign({}, {
        error: 'Oops! Something went wrong and we couldn\'t create your link',
        id: data.id
      });
      const expectedAction = {
        type: types.CREATE_LINK_FAILURE,
        id: dataFail.id,
        error: dataFail.error
      };
      expect(actions.createLinkFailure(dataFail)).toEqual(expectedAction);
    });

    it('should create an action on a link duplicate', () => {
      const expectedAction = {
        type: types.CREATE_LINK_DUPLICATE
      };
      expect(actions.createLinkDuplicate()).toEqual(expectedAction);
    });

    it('should create an action when fetching links', () => {
      sandbox.stub(axios, 'get').returns('hello');
      const expectedAction = {
        type: types.GET_LINKS,
        promise: 'hello'
      };
      expect(actions.fetchLinks()).toEqual(expectedAction);
    });
  });
});
