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

const algorithm = new class {
  setDispatch(dispatch) {
    this.store = {
      varAdd: (value, key) => dispatch(addVar(value, key)),
      varReset: () => dispatch(resetVar())
    }
  }

  setTabs(tabs) {
    this.tabs = tabs
  }

  // transform to javascript
  toJS() {
    this.store.varReset()
    this.js = ''

    // and execute a interpreter
    // const codesInString = joinCodes(this.tabs)
    const codesInString = this.tabs[0].content
    const [title, codeFromTitle] = files(codesInString)
    const literals = vars(codeFromTitle, this.store)
    const diff = diffAlg(codesInString, literals + this.js)
    const map = this.tabs.map((v) => v.content)

    // show the output
    const code = transform(codeFromTitle)
    return {
      title,
      literals,
      code,
      diff,
      map
    }
    // theConsole.run(title, literals, this.js, diff, map)
  }
}()

export default algorithm
