import React, { Component } from 'react'
import _ from 'lodash'
import { variables } from '../actions'
import store from '../stores'
import Menu from './menu'
import algorithm from '../core/algorithm'
import vector from '../core/vector'
import { error, type_error } from '../core/i18n'

const io = new class {
  constructor () {
    this.reset()
  }
  reset () {
    this.text = undefined
    this.last_text = undefined
    this.show = true
  }
  add_text (text) {
    this.last_text = this.text
    this.text = text
  }
  error () {
    this.show = false
  }
}

const engine = (props) => {
  let obj = { lines : [] }
  // eslint-disable-next-line no-unused-vars
  const read = (to_read) => {
    // flags
    var vector = false
    // clean up unnecessary signs
    while (to_read.substr(0, 1) === ' ') {
      var length = to_read.length - 1
      to_read = to_read.substr(1, length)
    }
    while (to_read.substr(to_read.length - 1, 1) === ' ')
      to_read = to_read.substr(0, to_read.length - 1)

    var input
    if (io.text && io.text !== io.last_text)
      input = prompt(io.text)

    else
      input = prompt('')
    // if var not exist, not work
    if (_.last(obj.lines).var)
      obj.lines = _.concat(obj.lines, {
        content : input
      })

    else
      obj.lines = _.concat(_.dropRight(obj.lines), {
        content : _.last(obj.lines).content,
        var     : input
      })
    if (typeof to_read === 'object')
      return `${to_read} = ${input};`
    // vector
    else if (to_read.search(/\.io\(/) !== -1) {
      vector = true
      to_read += '.add(' + input + ')'
    }
    // here in runtime show the mistakes in assignings
    switch (variables[to_read]) {
    case 'int':
      if (isNaN(Number(input)) || +input !== Math.trunc(input))
        return `write('${type_error.int}'); io.error();`
      break
    case 'double':
      if (isNaN(Number(input)))
        return `write('${type_error.double}'); io.error();`
      break
    case 'string':
      break
    case 'bool':
      if (isNaN(Number(input)) || +input < 0 || +input > 2)
        return `write('${type_error.bool}'); io.error();`
      break
    }
    if (variables[to_read] === 'string')
      return `${to_read} = '${input}';`

    else if (vector)
      return `${to_read};`

    else
      return `${to_read} = ${input};`
  }
  function write () {
    // var
    let result = ''
    for (var i in arguments) {
      var text = arguments[i]
      if (typeof text === 'object' && text.is_vector && text.is_vector())
        text = text.show()

      if (typeof text === 'number' && isNaN(text))
        return `write('${error.string_for_number}'); io.error();`
      if (typeof text === 'number' && !isFinite(text))
        return `write('${error.infinity}'); io.error();`
      result += text
    }
    // io.show is a flag, avoids execution after errors
    if (io.show) {
      // if (io.last_text === result)
      //   io.reset_last()
      io.add_text(result)
      obj.lines = _.concat(obj.lines, [ {
        content : result
      } ])
    }
  }
  const out = () =>
    obj.lines

  let { title, literals, code, diff_line_code, map } = algorithm.to_js()

  io.reset()
  obj.lines = _.concat(obj.lines, [ {
    content : `algorithm run ${title}.js`
  } ])
  /* non-existent code for name of algorithm */
  // show console before of prompt
  // eslint-disable-next-line no-console
  console.log(literals + code)

  setTimeout(() => {
    try {
      // eslint-disable-next-line no-unused-vars
      let Vector = vector
      // eslint-disable-next-line no-unused-vars
      let { variables } = store.getState()
      if (/Firefox/.test(navigator.userAgent))
        eval(literals + code)
      else
        eval('eval(literals + code)')
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      let empty = ' '
      // form stack trace
      let line = /Firefox/.test(navigator.userAgent) ?
        e.lineNumber :
        +e.stack
          // split for line
          .split(`\n`)
          // filter eval error
          .filter(line => /eval/.test(line))
          // become a string
          .join()
          // find line of eval error
          .match(/:[0-9]+:[0-9]+/)
          // become a string
          .join()
          // split for :
          .split(`:`)
          // extract line number
          .pop()
      // firefox implementation
      // let line = e.lineNumber || window.error
      let line_error = map[line + diff_line_code - 1] ?
        `error in the line ${line + diff_line_code}: ` :
        ''

      write(`${line_error}${e.message}`)
      if (line_error !== '') {
        write(`  ${line + diff_line_code - 1}  | ${map[line + diff_line_code - 2] || empty}`)
        write(` <${line + diff_line_code}> | ${map[line + diff_line_code - 1] || empty}`)
        write(`  ${line + diff_line_code + 1}  | ${map[line + diff_line_code] || empty}`)
      }
      return -1
    }
  }, 500)
  // use eval for debug errors
  // eval(literals + code)
  return { out }
}

class Console extends Component {
  constructor (props) {
    super(props)
    this.state = { lines : [] }
  }
  componentDidMount () {
    const lines = engine()
    this.linesDidRender(lines)
  }
  linesDidRender (lines) {
    this.loop = setInterval(() => {
      this.setState({
        lines : lines.out()
      })
    }, 100)
  }
  componentWillUnmount () {
    clearInterval(this.loop)
  }
  render () {
    return (
      <Menu>
        <div id='content2' className='tab'>
          <div className='console'>
            { this.state.lines.map((value, key) =>
              <div key={key}>
                <div className='lines'>
                  <div className='CodeMirror-linenumber CodeMirror-gutter-elf arrow'>
                    { '\u003E' }
                  </div>
                  <div className="margin-line">
                    { value.content }
                    { value.var ?
                      <div className="var">{ value.var }</div> : ''
                    }
                  </div>
                </div>
                <br/>
              </div>
            ) }
          </div>
        </div>
      </Menu>
    )
  }
}

export default Console
