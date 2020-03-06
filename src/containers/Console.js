import React, { useReducer, useState, useEffect } from 'react'
// import _ from 'lodash'
// import { addVar, resetVar } from '../actions'
// import store from '../reducers'
import algorithm from '../core/algorithm'
import vector from '../core/vector'
import { typeError } from '../core/i18n'
import ConsoleComponent from '../components/Console'
import varsReducer from '../reducers/variables'
import useTabs from '../hooks/useTabs'
import Menu from './Menu'

const io = {
  show: true,

  reset() {
    this.text = undefined
    this.lastText = undefined
    this.show = true
  },

  addText(text) {
    this.lastText = this.text
    this.text = text
  },

  error() {
    this.show = false
  }
}

let id = -1

function lastElement(array) {
  return array[array.length - 1]
}

export default function () {
  const [variables, dispatch] = useReducer(varsReducer, [])
  const { tabs } = useTabs()
  // const lines = []
  const [lines, setLines] = useState([])
  const cache = []


  // eslint-disable-next-line no-unused-vars
  function read(toRead) {
    let toReadCopy = toRead

    // flags
    let isVector = false
    // clean up unnecessary signs
    while (toReadCopy.substr(0, 1) === ' ') {
      const length = toReadCopy.length - 1
      toReadCopy = toReadCopy.substr(1, length)
    }
    while (toReadCopy.substr(toReadCopy.length - 1, 1) === ' ') toReadCopy = toReadCopy.substr(0, toReadCopy.length - 1)

    let input
    if (io.text && io.text !== io.lastRext) input = prompt(io.text)

    else input = prompt('')
    // if var not exist, not work
    if (lastElement(cache).var) {
      id += 1
      cache.push({
        id,
        content: input
      })
      setLines([...cache])
    }

    else {
      id += 1
      cache.pop()
      cache.push({
        id,
        content: lastElement(cache).content,
        var: input
      })
      setLines([...cache])
    }
    if (typeof toReadCopy === 'object') return `${toReadCopy} = ${input};`
    // vector
    if (toReadCopy.search(/\.io\(/) !== -1) {
      isVector = true
      toReadCopy += `.add(${input})`
    }
    // here in runtime show the mistakes in assignings
    switch (variables[toReadCopy]) {
      case 'int':
        if (Number.isNaN(Number(input)) || +input !== Math.trunc(input)) return `write('${typeError.int}'); io.error();`
        break
      case 'double':
        if (Number.isNaN(Number(input))) return `write('${typeError.double}'); io.error();`
        break
      case 'string':
        break
      case 'bool':
        if (Number.isNaN(Number(input)) || +input < 0 || +input > 2) return `write('${typeError.bool}'); io.error();`
        break
      default:
        throw new Error('Unknow var type')
    }
    if (variables[toReadCopy] === 'string') return `${toReadCopy} = '${input}';`

    if (isVector) return `${toReadCopy};`

    return `${toReadCopy} = ${input};`
  }

  function write(...args) {
    // var
    let result = ''
    let error
    Object.values(args).forEach((text) => {
      let textCopy = text
      if (typeof textCopy === 'object' && textCopy.isVector && textCopy.isVector()) textCopy = textCopy.show()

      if (typeof textCopy === 'number' && Number.isNaN(textCopy)) error = `write('${error.stringForNumber}'); io.error();`
      if (typeof textCopy === 'number' && !Number.isFinite(textCopy)) error = `write('${error.infinity}'); io.error();`
      result += textCopy
    })
    if (error) return error
    // io.show is a flag, avoids execution after errors
    if (io.show) {
      // if (io.lastText === result)
      //   io.resetLast()
      io.addText(result)
      id += 1
      cache.push({
        id,
        content: result
      })
      setLines([...cache])
    }
    return ''
  }

  io.reset()


  /* non-existent code for name of algorithm */
  // show console before of prompt
  // eslint-disable-next-line no-console
  algorithm.setDispatch(dispatch)
  algorithm.setTabs(tabs)

  useEffect(() => {
    const { title, literals, code, diffLineCode, map } = algorithm.toJS()
    console.log(literals + code)

    id += 1
    cache.push({
      id,
      content: `algorithm run ${title}.js`
    })
    setLines([...cache])

    setTimeout(() => {
      try {
        // eslint-disable-next-line no-unused-vars
        const Vector = vector
        // eslint-disable-next-line no-unused-vars
        // const { variables } = store.getState()
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
  }, [])


  // use eval for debug errors
  // eval(literals + code)
  return (
    <Menu>
      <ConsoleComponent lines={lines} />
    </Menu>
  )
}
