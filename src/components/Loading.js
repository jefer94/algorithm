import React, { memo } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import './Loading.sass'

function Loading() {
  const loading = true
  return (
    <div className="algorithm-loading">
      <PulseLoader color="var(--oracle)" loading={loading} />
    </div>
  )
}

export default memo(Loading)
