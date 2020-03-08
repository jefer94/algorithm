import React, { useEffect, useState, lazy } from 'react'
import useTabs from '../hooks/useTabs'

const TabsComponent = lazy(() => import('../components/Tabs'))
const EditorComponent = lazy(() => import('../components/Editor'))


export const editor = {
  getValue() {
    return this.value.getValue()
  },

  setValue(value) {
    this.value = value
  },

  reset() {
    this.value = null
  }
}

// const options = {
//   mode: 'algorithm.es',
//   theme: 'material',
//   lineNumbers: true,
//   lineWrapping: true,
//   showCursorWhenSelecting: true,
//   extraKeys: { 'Ctrl-Space': 'autocomplete' }
// }

function getActiveContent(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].content
  return ''
}

function getActiveId(tabs) {
  const res = tabs.filter((value) => value.active)
  if (res.length) return tabs[0].id
  return -1
}

export default function () {
  const { tabs, addTab, changeTab, saveTab, removeTab } = useTabs()
  // const [id, setId] = useState(0)
  const [id, setId] = useState(getActiveId(tabs))
  const [content, setContent] = useState(getActiveContent(tabs))
  // useEffect(() => () => {
  //   const tab = tabs.filter((tab) => tab.active)[0]
  //   if (tab && tab.name) saveTab(tab.name)
  // })

  useEffect(() => {
    const res = tabs.filter(({ active }) => active)
    if (res.length) {
      const [tab] = res
      if (id === tab.id && content !== tab.content) saveTab(tab.id, content)
      else if (id !== tab.id) setId(tab.id)
    }
  }, [content, tabs])

  return (
    <>
      <TabsComponent
        tabs={tabs}
        add={addTab}
        change={changeTab}
        remove={removeTab}
      />
      <EditorComponent content={content || ''} onChange={setContent} />
    </>
  )
}
