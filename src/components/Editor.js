import React, { useState, memo, lazy } from 'react'
import PropTypes from 'prop-types'

const ControlledEditor = lazy(() => import('./MonacoWrapper'))

function windowHeight() {
  return +window.innerHeight - 48
}

function windowWidth() {
  return +window.innerWidth
}

function Editor({ content, onChange }) {
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
      <ControlledEditor
        value={content}
        width={width}
        height={height}
        language="javascript"
        theme="dark"
        onChange={(x, v) => onChange(v)}
      />
    </main>
  )
}
Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default memo(Editor)
