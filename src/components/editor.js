import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/anyword-hint.js'
import '../modes/algorithm'
import { tabs } from '../actions'

const editor = new class {
  getValue () {
    return this.value.getValue()
  }
  setValue (value) {
    this.value = value
  }
  reset () {
    this.value = void 0
  }
}

class Editor extends Component {
  constructor (props) {
    super(props)
    const length = props.tabs.length
    this.content = length === 1 ?
      props.tabs[0].content :
      props.tabs.filter(value => value.active)[0].content
    this.options = {
      mode                    : 'algorithm.es',
      theme                   : 'material',
      lineNumbers             : true,
      lineWrapping            : true,
      showCursorWhenSelecting : true,
      extraKeys               : { 'Ctrl-Space' : 'autocomplete' }
    }
  }
  componentWillReceiveProps (props) {
    const length = props.tabs.length
    this.content = length === 1 ?
      props.tabs[0].content :
      props.tabs.filter(value => value.active)[0].content
  }
  editorDidMount (_editor) {
    editor.setValue(_editor)
  }
  componentWillUnmount () {}
  render () {
    return (
      <div id='content1' className='tab show-content'>
        <CodeMirror value={this.content} options={this.options} editorDidMount={this.editorDidMount} onChange={()=>{}}/>
      </div>
    )
  }
}

Editor.propTypes = {
  tabs   : PropTypes.array,
  add    : PropTypes.func,
  remove : PropTypes.func,
  move   : PropTypes.func
}

export { editor }
export default connect(
  state => ({
    tabs : state.tabs
  }),
  dispatch => ({
    add    : (name) => dispatch(tabs.add(name)),
    remove : (name) => dispatch(tabs.remove(name)),
    move   : (name) => dispatch(tabs.move(name))
  })
)(Editor)
