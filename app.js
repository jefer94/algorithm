import CodeMirror from 'codemirror'
var editor
var codemirror = () => {
  console.log('a')
  CodeMirror.commands.autocomplete = function(cm) {
    cm.showHint({
      hint: CodeMirror.hint.anyword
    })
  }
  editor = CodeMirror.fromTextArea( document.getElementById("code") , {
    mode: "algorithm.es",
    lineNumbers: true,
    lineWrapping: true,
    showCursorWhenSelecting: true,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  })
  editor.setOption("theme", "material")
  // global.tabs.push(default_code)
  editor.setValue(default_code)
  // if (!localStorage.getItem('helper'))
  //   helper()
}

export default codemirror
export { editor }
