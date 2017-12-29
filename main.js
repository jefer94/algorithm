import React from 'react'
import { render } from 'react-dom'
// import { Route } from 'react-router'
// import createBrowserHistory from 'history/createBrowserHistory'
// import { ConnectedRouter as Router, routerMiddleware } from 'react-router-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'

import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
// import filter from 'redux-localstorage-filter'
// import Helper from './src/components/helper';
import Menu from './src/components/ide'
import Tabs from './src/components/tabs'
import Editor from './src/components/editor'
import Docs from './src/components/docs'
import Console from './src/components/console'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import './src/sass/onedark.sass'
import './src/sass/editor.sass'

import reducers from './src/stores'

// const history = createBrowserHistory()
// const router = routerMiddleware(history)

const reducer = compose(
  mergePersistedState()
)(reducers)

const storage = compose(
  // filter('nested.key')
)(adapter(window.localStorage))

const enhancer = compose(
  applyMiddleware(logger),
  // applyMiddleware(router),
  persistState(storage, '__ALGORITHM__')
)

const store = createStore(reducer /* , [initialState]*/, enhancer)

const App = () =>
  <div>
    <Tabs/>
    <div id='screen' className='screen'>
      <Editor/>
      <Console/>
    </div>
  </div>

const Help = () =>
  <Menu>
    <Docs/>
  </Menu>

const Terminal = () =>
  <Menu>
    <Console/>
  </Menu>

const Routes = () =>
  // <Router history={history}>
  <Router history={history}>
    <div>
      <Route component={App} path='/' exact/>
      <Route component={Help} path='/menu' exact/>
      <Route component={Terminal} path='/console' exact/>
    </div>
  </Router>

render(
  // <Console/>
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('app')
)
