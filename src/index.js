import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'
// import { IonApp } from '@ionic/react'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import Loading from './components/Loading'

import './index.sass'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
// import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import './globals/variables.sass'
import './globals/buttons.sass'

import './sass/onedark.sass'
import './sass/editor.sass'


// import './index.sass'

const Docs = lazy(() => import('./containers/Docs'))
const Console = lazy(() => import('./containers/Console'))
const TabsAndEditor = lazy(() => import('./containers/TabsAndEditor'))

render(
  <IonApp>
    <IonReactRouter>
      <Suspense fallback={<Loading />}>
        <IonRouterOutlet id="content-menu" class="content" contentId="content-menu" main>
          <Route component={TabsAndEditor} path="/" exact />
          <Route component={Docs} path="/docs" exact />
          <Route component={Console} path="/console" exact />
        </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  </IonApp>,
  // <IonApp>
  //   <Router>
  //     <Suspense fallback={<Loading />}>
  //       <Switch>
  //         <Route component={TabsAndEditor} path="/" exact />
  //         <Route component={Docs} path="/docs" exact />
  //         <Route component={Console} path="/console" exact />
  //       </Switch>
  //     </Suspense>
  //   </Router>
  // </IonApp>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (window.location.protocol === 'file:') serviceWorker.unregister()
else serviceWorker.register()
// serviceWorker.register()
