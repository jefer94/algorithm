import React from 'react'
import { render } from 'react-dom'
// import { Route } from 'react-router'
// import createBrowserHistory from 'history/createBrowserHistory'
// import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './components/app'
import Docs from './components/docs'
import Console from './components/console'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import './sass/onedark.sass'
import './sass/editor.sass'

import store from './stores'

// const history = createBrowserHistory()
// const router = routerMiddleware(history)

render(
  // <Console/>
  <Provider store={store}>
    {/* <Router history={history}>*/}
    <Router>
      <div>
        <Route component={App} path='/' exact/>
        <Route component={Docs} path='/docs' exact/>
        <Route component={Console} path='/console' exact/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
)
