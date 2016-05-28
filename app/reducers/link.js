import {
  TYPING,
  CREATE_LINK_REQUEST,
  CREATE_LINK_FAILURE,
  DESTROY_LINK,
  INCREMENT_LIKE,
  DECREMENT_LIKE,
  GET_LINKS_REQUEST,
  GET_LINKS_SUCCESS,
  GET_LINKS_FAILURE } from 'types';


export default function link(state = {
  links: [],
  newLink: ''
}, action) {
  switch (action.type) {
    case TYPING:
      return Object.assign({}, state,
        { newLink: action.newLink }
      );
    case GET_LINKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_LINKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        links: action.req.data
      });
    case GET_LINKS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case CREATE_LINK_REQUEST:
      return {
        links: [...state.links, { id: action.id, like: action.like, text: action.text }],
        newLink: ''
      };
    case CREATE_LINK_FAILURE:
      return {
        links: [...state.links.filter((tp) => tp.id !== action.id)],
        newLink: state.newLink
      };
    case DESTROY_LINK:
      return {
        links: [...state.links.filter((tp, i) => i !== action.index)],
        newLink: state.newLink
      };
    case INCREMENT_LIKE:
      return {
        links: [
        ...state.links.slice(0, action.index),
        Object.assign({}, state.links[action.index], {
          like: state.links[action.index].like + 1
        }),
        ...state.links.slice(action.index + 1)
        ],
        newLink: state.newLink
      };
    case DECREMENT_LIKE:
      return {
        links: [
        ...state.links.slice(0, action.index),
        Object.assign({}, state.links[action.index], {
          like: state.links[action.index].like - 1
        }),
        ...state.links.slice(action.index + 1)
        ],
        newLink: state.newLink
      };

    default:
      return state;
  }
}
