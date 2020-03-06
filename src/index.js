import React from 'react'
import { render } from 'react-dom'

import { HashRouter as Router, Route } from 'react-router-dom'
// import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import './variables/globals.sass'

import Docs from './components/Docs'
import Console from './containers/Console'
import TabsAndEditor from './containers/TabsAndEditor'

import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import './sass/onedark.sass'
import './sass/editor.sass'

render(
  <Router>
    <div>
      <Route component={TabsAndEditor} path="/" exact />
      <Route component={Docs} path="/docs" exact />
      <Route component={Console} path="/console" exact />
    </div>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
