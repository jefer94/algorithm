import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import './globals/variables.sass'
import './globals/buttons.sass'

// import Docs from './containers/Docs'
// import Console from './containers/Console'
// import TabsAndEditor from './containers/TabsAndEditor'
import Loading from './components/Loading'

const Docs = lazy(() => import('./containers/Docs'))
const Console = lazy(() => import('./containers/Console'))
const TabsAndEditor = lazy(() => import('./containers/TabsAndEditor'))


// import 'codemirror/lib/codemirror.css'
// import 'codemirror/addon/hint/show-hint.css'
import './sass/onedark.sass'
import './sass/editor.sass'

render(
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route component={TabsAndEditor} path="/" exact />
        <Route component={Docs} path="/docs" exact />
        <Route component={Console} path="/console" exact />
      </Switch>
    </Suspense>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
