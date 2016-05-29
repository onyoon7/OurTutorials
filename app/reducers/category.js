import {
  GET_CHILDREN_REQUEST,
  GET_CHILDREN_SUCCESS,
  GET_CHILDREN_FAILURE,
  GET_ALL_LINKS_REQUEST,
  GET_ALL_LINKS_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_ALL_LINKS_FAILURE,
  GET_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from 'types';


export default function category(state = {
  categories: [],
  newCategory: '',
  links: []
},action) {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      console.log('Request!!!')
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        categories: action.req.data
      });
    case GET_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_CHILDREN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_CHILDREN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        categories: action.req.data
      });
    case GET_CHILDREN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case GET_ALL_LINKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_ALL_LINKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        links: action.req.data
      });
    case GET_ALL_LINKS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case ADD_CATEGORY_REQUEST:
      return {

      }

    default:
      return state;
  }
}
