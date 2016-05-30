// promise 기반 http 클라이언트
import axios from 'axios';
import React from 'react';

// 서버 쪽에서 component를 render할 때 사용. ReactElement를 HTML로 만들어준다.
import { renderToString } from 'react-dom/server';

// CreateMemoryHistory - 인메모리 history(object that contains URLs visited by the user) 객체를 생성한다.

// match({routes, location, [history], ...options}, cb) - 서버 쪽에 들어온 location(예를 들면 req.url)이 주어진 routes에 매칭되는지 확인하고 각각의 경우에 따라 callback 함수를 호출한다. callback 함수는 error, redirectLocation, renderProps 세 가지 인자를 가지는데, 셋 다 undefined일 경우는 location에 해당되는 route가 없을 경우다.

// RouterContext - renders the component tree for a given router state. Its used by <Router> but also useful for server rendering and integrating in brownfield development.
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from 'routes';
import configureStore from 'store/configureStore';

// 컴포넌트의 static need를 보고, dispatch(need(params))가 모두 끝날 때까지 기다린다.
import preRenderMiddleware from 'middlewares/preRenderMiddleware';
import header from 'components/Meta';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  // console.log('history: ',history);
  // redux-thunk, redux-logger등을 미들웨어로 가지는 store 생성
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    },
  }, history);
  // store를 받아서 '/', 'login', 'dashboard', 'course' 경로에 대한 component를 정의한 route를 반환한다.
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */
  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser

      // 이 경우에는 Tutorial Component에 있는 static need = [fetchLinks]를 보고 dispatch(fetchLinks)가 끝날 때까지 기다리는 것.

      // links.js
      // export function fetchLinks() {
      //   return {
      //     type: types.GET_LINKS,
      //     promise: makeLinkRequest('get')
      //   };
      // }

      // server/routes.js
      // app.get('/link', linksController.all);
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
      .then(() => {
        const initialState = store.getState();
        // console.log(initialState);
        const componentHTML = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );

        res.status(200).send(`
          <!doctype html>
          <html ${header.htmlAttributes.toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
            </head>
            <body>

              <div id="app">${componentHTML}</div>

              <div class="footer text-center spacer">
              <p class="wowload flipInX"></p>
              Copyright 2016 Code Hot-guys Studio. All rights reserved.
              </div>

              <a href="#works" class="gototop"><i class="fa fa-angle-up  fa-3x"></i></a>

              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
              <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>

            </body>
          </html>


        `);
      })
      .catch((err) => {
        console.log('err: ',err);
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(404);
    }
  });
}
