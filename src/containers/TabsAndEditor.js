import React, { useEffect, useState } from 'react'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/anyword-hint'
import '../modes/algorithm'
import TabsComponent from '../components/Tabs'
import EditorComponent from '../components/Editor'
import useTabs from '../hooks/useTabs'

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

const options = {
  mode: 'algorithm.es',
  theme: 'material',
  lineNumbers: true,
  lineWrapping: true,
  showCursorWhenSelecting: true,
  extraKeys: { 'Ctrl-Space': 'autocomplete' }
}

function getActiveContent(tabs) {
  if (tabs.length === 1) return tabs[0].content
  if (tabs.length > 1) return tabs.filter((value) => value.active)[0].content
  return ''
}

export default function () {
  const { tabs, addTab, changeTab, saveTab } = useTabs()
  // const [id, setId] = useState(0)
  const [ignoreContentUpdate, setIgnoreContentUpdate] = useState(false)
  const [content, setContent] = useState(getActiveContent(tabs))

  // useEffect(() => () => {
  //   const tab = tabs.filter((tab) => tab.active)[0]
  //   if (tab && tab.name) saveTab(tab.name)
  // })

  useEffect(() => {
    if (!ignoreContentUpdate) {
      const res = tabs.filter(({ active }) => active)
      if (res.length) {
        const tab = tabs.filter(({ active }) => active)[0]
        saveTab(tab.id, content)
      }
    }
    else setIgnoreContentUpdate(false)
  }, [content])

  useEffect(() => {
    setIgnoreContentUpdate(true)
    setContent()
  }, [tabs])

  // useEffect(() => {
  //   const res = tabs.filter(({active}) => active)
  //   if (res.length) {
  //     const tab = tabs.filter(({active}) => active)[0]
  //     setContent(tab.content)
  //   }
  // }, [content])

  // function editorDidMount(editor) {
  //   editor.setValue(editor)
  // }

  return (
    <>
      <TabsComponent tabs={tabs} add={() => addTab()} change={(id) => changeTab(id)} />
      <EditorComponent content={content} options={options} onChange={setContent} />
    </>
  )
}
