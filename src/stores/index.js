import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
// import filter from 'redux-localstorage-filter'
// import Helper from './src/components/helper';
import tabs from './tabs'
import variables from './variables'

const reducers = combineReducers({
  tabs,
  variables
})

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

export default store
