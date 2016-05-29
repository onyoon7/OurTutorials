import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/link';
import * as types from 'types';

describe('Links reducer', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        links: [],
        newLink: ''
      }
    );
  });

  it('Should add a new link to an empty initial state', () => {
    const link = 'A time machine';
    const id = md5.hash(link);
    expect(
      reducer(undefined, {
        type: types.CREATE_LINK_REQUEST,
        id,
        count: 1,
        text: link
      })
    ).toEqual({
      links: [
        {
          id,
          count: 1,
          text: link
        }
      ],
      newLink: ''
    });
  });
});
