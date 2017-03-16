'use strict';
class Console {
  constructor () {
    // what happen with this?
		// window.__variables = null;
  }
  run (title, literals, code) {
    var the_console = document.getElementById('console');
    the_console.innerHTML = '';
    var read = this.read;
    var write = this.write;
    /* non-existent code for name of algorithm */
    the_console.innerHTML += '<div class="lines"><div class="CodeMirror-linenumber ' +
      'CodeMirror-gutter-elt arrow">&gt;</div> <div class="margin-line"> ' +
      'algorithm run ' + title + '.js</div></div>';
    console.log(literals + code);
    // console.log(read);
    // console.log(write);
    eval(literals + code);
  }
  read (to_read) {
    var input = prompt('valor');
    var the_console = document.getElementById('console');
    the_console.innerHTML += '<div class="lines"><div ' +
      'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
      '<div class="margin-line"> ' + input + '</div></div>';
    console.log(`${to_read} = ${input};`);
    return `${to_read} = ${input};`;
    /* var the_console = document.getElementById('console');
    the_console.innerHTML += '<div class="lines"><div ' +
      'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
      '<div class="margin-line"><input id="read" onkeypress="the_console.summit(event);" name="' + to_read + '"></div></div>';
    var delay = setTimeout(() => {
      if (window.__variables != {}) clearInterval(delay);
    }, 333);*/
  }
  summit (event) {
    // console.log(event);
    if (typeof event !== 'undefined' && event.keyCode == 13) {
      var result = document.getElementById('read');
      result.setAttribute('readonly', true);
      var name = result.name.replace(/ /g, '');
      var value = result.value;
      window.__variables[name] = value;

      return false; // returning false will prevent the event from bubbling up.
    }
    else
      return true;
  }
  write (text) {
    // sandbox /*
    /* var variables = window.__variables;
    var init = '';
    var i;
    for (i in variables) {
      init += `var ${i} = variables["${i}"];`;
    }
    eval(init);
    console.log(init);
    console.log(text);    */
    var the_console = document.getElementById('console');
    the_console.innerHTML += '<div class="lines"><div ' +
      'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
      '<div class="margin-line"> ' + text + '</div></div>';
  }

}
