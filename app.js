var editor;
var result;
window.onload = function() {
  CodeMirror.commands.autocomplete = function(cm) {
    cm.showHint({hint: CodeMirror.hint.anyword});
  }
  editor = CodeMirror.fromTextArea( document.getElementById("code") , {
    mode: "algorithm.es",
    lineNumbers: true,
    lineWrapping: true,
    showCursorWhenSelecting: true,
    extraKeys: {"Ctrl-Space": "autocomplete"}
  });
  editor.setOption("theme", "material");
}
