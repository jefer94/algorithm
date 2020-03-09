import React, { useReducer, useState, useEffect, lazy } from 'react'
// import _ from 'lodash'
// import { addVar, resetVar } from '../actions'
// import store from '../reducers'
import algorithm from '../libs/algorithm'
import vector from '../libs/vector'
import varsReducer from '../reducers/variables'
import useTabs from '../hooks/useTabs'
import Menu from './Menu'
import { io, write as writeInConsole, read as readInConsole } from '../libs/algorithm/io'
import keychain from '../libs/keychain'

const ConsoleComponent = lazy(() => import('../components/Console'))

let cache = []

export default function () {
  const [runtimeObj, setRuntimeObj] = useState(null)
  const [variables, dispatch] = useReducer(varsReducer, [])
  const { tabs } = useTabs()
  // const lines = []
  const [lines, setLines] = useState([])


  // eslint-disable-next-line no-unused-vars
  function read(toRead) {
    console.log(readInConsole(toRead, variables, cache[cache.length - 1]), 'preassign')
    // const { assign } = readInConsole(toRead, variables, lines[lines.length - 1])
    // console.log(assign, 'assign')
    // return assign
  }

  // eslint-disable-next-line no-unused-vars
  function write(...args) {
    cache.push(writeInConsole(args))
    setLines([...cache])
    // return content
    return ''
  }


  /* non-existent code for name of algorithm */
  algorithm.setDispatch(dispatch)
  algorithm.setTabs(tabs)

  useEffect(() => {
    if (!runtimeObj) {
      cache = []
      io.reset()
      setRuntimeObj(algorithm.toJS())
    }
    else {
      const { title, literals, code, diffLineCode, map } = runtimeObj
      console.log(literals + code)

      cache.push({
        id: keychain('line'),
        content: `algorithm run ${title}.js`
      })
      setLines([...cache])

      setTimeout(() => {
        try {
          // eslint-disable-next-line no-unused-vars
          const Vector = vector
          // eslint-disable-next-line no-unused-vars
          // const { variables } = store.getState()
          console.log('log', literals, code)
          if (/Firefox/.test(navigator.userAgent)) eval(literals + code)
          else eval('eval(literals + code)')
        }
        catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
          const empty = ' '
          // form stack trace
          const line = /Firefox/.test(navigator.userAgent) ?
            e.lineNumber :
            +e.stack
              // split for line
              .split('\n')
              // filter eval error
              .filter((v) => /eval/.test(v))
              // become a string
              .join()
              // find line of eval error
              .match(/:[0-9]+:[0-9]+/)
              // become a string
              .join()
              // split for :
              .split(':')
              // extract line number
              .pop()
          // firefox implementation
          // let line = e.lineNumber || window.error
          const lineError = map[line + diffLineCode - 1] ?
            `error in the line ${line + diffLineCode}: ` :
            ''

          write(`${lineError}${e.message || e.name}`)
          if (lineError !== '') {
            write(`  ${line + diffLineCode - 1}  | ${map[line + diffLineCode - 2] || empty}`)
            write(` <${line + diffLineCode}> | ${map[line + diffLineCode - 1] || empty}`)
            write(`  ${line + diffLineCode + 1}  | ${map[line + diffLineCode] || empty}`)
          }
        }
      }, 500)
    }
  }, [runtimeObj])


  // use eval for debug errors
  // eval(literals + code)
  return (
    <Menu>
      <ConsoleComponent lines={lines} />
    </Menu>
  )
}
