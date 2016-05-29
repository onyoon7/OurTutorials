/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

export function makeCategoryRequest(method, data, api = '/category') {
  return request[method](api, data);
}

export function makeLinkRequest(method, data, api='/category/link') {
  return request[method](api, data);
}

export function fetchCategories() {
  return {
    type: types.GET_CATEGORIES,
    promise: makeCategoryRequest('get')
  };
}

export function getChildren(id) {
  return {
    type: types.GET_CHILDREN,
    promise: makeCategoryRequest('get', {
      classId : id
    })
  };
}

export function getAllLinks(id) {
  return {
    type: types.GET_ALL_LINKS,
    promise: makeLinkRequest('get', {
      classId: id
    })
  };
}

// export function addCategory(parentId, name) {
//   type: types.ADD_CATEGORY,
//   promise
// }
