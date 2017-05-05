import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/index.jsx'
import App from './components/app.jsx'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


var editor;
var result;
window.toload.push(() => {
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
});
window.onload = () => {
  for (let i in window.toload) {
    console.log(i);
    window.toload[i]();
  }
}
