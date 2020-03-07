import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { UnControlled as CodeMirror } from 'react-codemirror2'
// import MonacoEditor from 'react-monaco-editor'

// import {setModelLanguage} from 'monaco-editor'

// console.log('mo', setModelLanguage)

// import { ControlledEditor } from '@monaco-editor/react'


function windowHeight() {
  return +window.innerHeight - 48
}

function windowWidth() {
  return +window.innerWidth
}

function Editor() {
  // { content, onChange }) {
  const [height, setHeight] = useState(windowHeight())
  const [width, setWidth] = useState(windowWidth())

  const loop = setInterval(() => {
    const currentHeight = windowHeight()
    const currentWidth = windowWidth()

    if (currentHeight !== height) {
      clearInterval(loop)
      setHeight(currentHeight)
    }

    if (currentWidth !== width) {
      clearInterval(loop)
      setWidth(currentWidth)
    }
  })

  return (
    <main id="content1" className="tab show-content">
      {/* <ControlledEditor
        value={content}
        width={width}
        height={height}
        language="javascript"
        theme="dark"
        onChange={(x, v) => onChange(v)}
      /> */}
    </main>
  )
}
Editor.propTypes = {
  // content: PropTypes.string,
  // onChange: PropTypes.func.isRequired
}
Editor.defaultProps = {
  // content: ''
}

export default Editor
