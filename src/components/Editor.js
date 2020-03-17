import React, { useState, memo, lazy, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { editor as monaco } from 'monaco-editor/esm/vs/editor/editor.main'
import register from '../libs/algorithm/monaco'

const ControlledEditor = lazy(() => import('./MonacoWrapper'))

function windowHeight() {
  return +window.innerHeight - 71
}

function windowWidth() {
  return +window.innerWidth
}

function Editor({ content, onChange }) {
  const [height, setHeight] = useState(windowHeight())
  const [width, setWidth] = useState(windowWidth())

  useEffect(register, [])

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
      <ControlledEditor
        value={content}
        width={width}
        height={height}
        language="algorithm"
        theme="dark"
        onChange={(x, v) => onChange(v)}
        options={{
          fontSize: '14px',
          autoIndent: 'full'
        }}
      />
    </main>
  )
}
Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default memo(Editor)
