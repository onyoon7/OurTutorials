## Karma(with webpack)
1. `npm test` - runs all tests in test directory once.
2. `npm run test_watch` - runs all tests in test directory and keeps watching on changes.


## ESlint
1. `npm run lint` - runs eslint once for all files in app.


## Development
1. `npm run dev` - starts the webpack-dev-server. Hot-loading & linting is enabled.


## Production
1. `npm run build`
2. `npm start`


## Testing React
1. https://facebook.github.io/react/docs/test-utils.html


## Redux
###1. 동기
- 점점 더 복잡해지는 싱글 페이지 어플리케이션의 상태(서버 응답, 캐시 데이터, 활성화된 라우트, 선택된 탭 등)


###2. 3가지 원칙
- 모든 상태는 하나의 스토어에
- 상태는 읽기 전용(변화시키기 위해서는 dispatch를 활용)
- 상태 변화를 지정하기 위해서는 순수 함수인 리듀서를 사용.


###3. 생태계
 3.1. redux-thunk
   - 비동기 액션을 만들기 위한 가장 쉬운 방법
   - 액션 dispatch를 지연시키기 위해서 action자체가 아닌 function을 리턴한다.
   ex) `let x = 1+2` 를 `let foo = () => 1+2`로 바꿔서 나중에 호출하도록 하는 것.
 3.2. redux-logger
   - 모든 redux 액션과 다음 상태에 대한 기록 도구


###4. 액션
- 스토어로 보내는 데이터 묶음.
- 스토어의 유일한 정보원.
- `store.dispatch()`를 통해 보낸다.
- example code

  import {ADD_TODO, REMOVE_TODO } from '../actionTypes'

  function addTodo(text) {
    return {
      type: ADD_TODO,
      text
    }
  }

  dispatch(addTodo(text));


###5. 리듀서
- 액션은 무엇이 일어날지 기술하지만, 상태가 어떻게 바뀔지는 리듀서가 정한다.
- example code

  function todoApp(state = initialState, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return Objet.assign({}, state, {
          visibilityFilter: action.filter
        });
      case ADD_TODO:
        return Object.assign({}, state, {
          todos: [...state.todos, {
            text: action.text,
            completed: false
          }]
        });
      default:
        return state;
    }
  }

-`Object.assign()`을 통해 state의 복사본을 만들고 그것을 리턴한다.


###6. 스토어
- 스토어는 액션과 리듀서를 받아서 다음과 같은 일들을 수행한다.
1. `getState()` - 상태에 접근
2. `dispatch(action)` - 상태를 수정
3. `subscribe(listener)` - 리스너 등록
4. example code

  import { createStore } from 'redux';
  import { addTodo, completTodo, setVisibilityFilter, VisibilityFilters } from './actions';

  let store = createStore(todoApp);

  //초기 상태를 기록
  console.log(store.getState());

  //상태가 바뀔때마다 기록
  let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  );

  //액션들을 보낸다.
  store.dispatch(addTodo('Learn about actions'));
  store.dispatch(completeTodo(0));
  store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

  //상태 변경을 더 이상 받아보지 않는다.
  unsubscribe();


###7. 데이터 흐름
1. 엄격한 일방향 데이터 흐름
- `store.dispatch(action)`
- 스토어는 리듀서에 현재의 상태 트리와 액션을 넘긴다.
- Redux가 루트 리듀서에 의해 반환된 상태 트리를 저장한다.(`component.setState(newState)`)

###8. React와 함께 사용하기
1. 원래 Redux 자체는 React와 관계가 없다.
2. 앱의 최상위 컴포넌트만이 redux와 연관되는 것이 좋다.
3. Provider로 루트 컴포넌트를 감싸준다.
4. Redux와 연결하고 싶은 컴포넌트를 react-redux의 `connect()` 함수로 감싸준다.

###9. 비동기 액션
1. redux-thunk 미들웨어를 사용할 경우, 액션 생산자는 액션 객체 대신 함수를 반환할 수 있다.
2. 이 함수는 redux-thunk 미들웨어에 의해 실행된다.
3. example code
  import fetch from 'isomorphic-fetch';

  export const REQUEST_POSTS = 'REQUEST_POSTS';
  function requestPosts(reddit) {
    return {
      type: REQUEST_POSTS,
      reddit
    };
  }

  export const RECEIVE_POSTS = 'RECEIVE_POSTS'
  function receivePosts(reddit, json) {
    return {
      type: RECEIVE_POSTS,
      reddit,
      posts: json.data.children.map(child => child.data),
      receivedAt: Date.now()
    };
  }

  // 우리의 첫 번째 썽크 액션 생산자입니다!
  // 안쪽은 다르지만 다른 액션 생산자처럼 사용하면 됩니다:
  // store.dispatch(fetchPosts('reactjs'));

  export function fetchPosts(reddit) {

  // 썽크 미들웨어는 함수를 어떻게 다룰지 알고 있습니다.
  // 미들웨어는 디스패치 메서드를 함수에 인수로 보내서,
  // 함수가 직접 액션을 보낼 수 있도록 합니다.

  return function (dispatch) {

    // 첫번째 디스패치: 앱 상태를 갱신해서
    // API 호출이 시작됨을 알립니다.

    dispatch(requestPosts(reddit));

    // 썽크 미들웨어가 호출하는 함수는 값을 반환할 수 있고,
    // 이 값이 디스패치 메서드의 반환값이 됩니다.

    // 이 경우엔 기다릴 수 있는 약속을 반환합니다.
    // 썽크 미들웨어에서 필수적인건 아니지만, 우리의 편의를 위함입니다.

    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json =>

        // 디스패치는 여러번 가능합니다!
        // 여기서는 API 호출의 결과로 앱 상태를 갱신합니다.

        dispatch(receivePosts(reddit, json))
      );

      // 실제 앱에서는 네트워크 호출에서
      // 에러도 잡고 싶을겁니다.
    };
  }


###10. 비동기 흐름
1. 미들웨어가 없으면 redux는 동기 데이터 흐름만을 지원한다.
2. `applyMiddleware()`을 이용해 `createStore()`를 강화할 수 있다.
3. redux-thunk 같은 비동기 미들웨어는 스토어의 `dispatch()`를 감싸서 액션이 아니라 함수나 약속같은 다른 것들을 보낼 수 있게 해준다. 미들웨어는 무엇이든 받아서 해석한 다음 체인의 다음 미들웨어로 액션을 넘긴다.
4. 체인의 마지막 미들웨어가 액션을 보내면, 이 액션은 보통의 객체이며, 이 때 동기 redux 데이터 흐름이 시작된다.


###11. 미들웨어
1. 미들웨어는 액션을 보내는 순간부터 스토에어 도착하기까지 서드파티 확장을 사용할 수 있게 도와준다.
2. 미들웨어를 통해 로깅, 충돌 보고, 비동기 API와의 통신, 라우팅 등등을 할 수 있다.
####3. 미들웨어는 Redux에서 만날 가장 마술적인 부분!
- example code
  import { createStore, combineReducers, applyMiddleware } from 'redux';

  // applyMiddleware 는 createStore()를 받아서
  // 호환되는 API를 가진 함수를 반환한다.
  let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore);

  // 이것을 createStore()처럼 사용하면 된다.
  let todoApp = combineReducers(reducers);
  let store = createStoreWithMiddleware(todoApp);


###12. 서버 렌더링
1. 유저가 처음으로 어플리케이션에 요청을 보냈을 때 서버 렌더링이 주로 사용된다. 필요한 컴포넌트들을 HTML string으로 만든 후, 클라이언트에게 보내면, 그 이후는 클라이언트가 렌더링 임무를 넘겨받는다.

###참고
1. propTypes
앱의 규모가 커지면 컴포넌트들이 바르게 사용되었는지 확인하는게 도움이 됩니다. 확인은 propTypes를 명시해서 할 수 있습니다. React.PropTypes는 받은 데이터가 적절한지(valid) 확인하는데 사용할 수 있는 다양한 검증자(validator)를 제공합니다. prop에 부적절한 값을 명시한다면 JavaScript 콘솔에 경고가 보일 것입니다. 성능상의 문제로 propTypes는 개발 모드에서만 검사됩니다. 다음은 제공되는 검증자를 설명하는 예제입니다.


2. connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
Connects a React component to a Redux store.

It does not modify the component class passed to it.
Instead, it returns a new, connected component class, for you to use.

Arguments

[mapStateToProps(state, [ownProps]): stateProps] (Function): If specified, the component will subscribe to Redux store updates. Any time it updates, mapStateToProps will be called. Its result must be a plain object*, and it will be merged into the component’s props. If you omit it, the component will not be subscribed to the Redux store. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapStateToProps will be re-invoked whenever the component receives new props.

Note: in advanced scenarios where you need more control over the rendering performance, mapStateToProps() can also return a function. In this case, that function will be used as mapStateToProps() for a particular component instance. This allows you to do per-instance memoization. You can refer to #279 and the tests it adds for more details. Most apps never need this.
[mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): If an object is passed, each function inside it will be assumed to be a Redux action creator. An object with the same function names, but with every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way. (Tip: you may use the bindActionCreators() helper from Redux.) If you omit it, the default implementation just injects dispatch into your component’s props. If ownProps is specified as a second argument, its value will be the props passed to your component, and mapDispatchToProps will be re-invoked whenever the component receives new props.


