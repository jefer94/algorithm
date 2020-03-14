// import _ from 'lodash'
// import store from '../reducers'
import { addVar, resetVar } from '../../actions'
import files from './files'
import vars from './variables'
import diffAlg from './diff'
import transform from './transform'

// function joinCodes(tabs) {
//   return tabs
//     .reverse()
//     .map((value) => value.content)
//     .join()
// }

let tabs
let store

export function setDispatch(dispatch) {
  store = {
    varAdd: (value, key) => dispatch(addVar(value, key)),
    varReset: () => dispatch(resetVar())
  }
}

export function setTabs(externalTabs) {
  tabs = externalTabs
}

export function toJS() {
  store.varReset()

  // and execute a interpreter
  // const codesInString = joinCodes(tabs)
  const codesInString = tabs[0].content
  const [title, codeFromTitle] = files(codesInString)
  const literals = vars(codeFromTitle, store)
  const diff = diffAlg(codesInString, literals)
  const map = tabs.map((v) => v.content)

  // show the output
  const code = transform(codeFromTitle)
  return {
    title,
    literals,
    code,
    diff,
    map
  }
}
