'use strict';
class Console {
  constructor () {
  }
  run (title, literals, code) {
    var the_console = document.getElementById('console');
    the_console.innerHTML = '';
    var read = this.read;
    var write = this.write;
		// eval cannot look this
		window.__io = {
			text: undefined,
			last_text: undefined
		}
    /* non-existent code for name of algorithm */
    the_console.innerHTML += '<div class="lines"><div class="CodeMirror-linenumber ' +
      'CodeMirror-gutter-elt arrow">&gt;</div> <div class="margin-line"> ' +
      'algorithm run ' + title + '.js</div></div>';
    console.log(literals + code);
		// show console before of prompt
		setTimeout(() => eval(literals + code), 100);
    // eval(literals + code);
  }
  read (to_read) {
    while (to_read.substr(0, 1) === ' ') {
		  var length = to_read.length - 1;
      to_read = to_read.substr(1, length);
    }
    while (to_read.substr(to_read.length - 1, 1) === ' ')
      to_read = to_read.substr(0, to_read.length - 1);

		var input;
		if (window.__io.text && window.__io.text != window.__io.last_text) {
			window.__io.last_text = window.__io.text;
			input = prompt(window.__io.text);
		}
		else
      input = prompt('');
    // var the_console = document.getElementById('console');
    var the_console = document.getElementById('var');
		the_console.innerHTML += input;
		/*the_console.innerHTML += '<div class="lines"><div ' +
      'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
      '<div class="margin-line"> ' + input + '</div></div>';*/
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
		window.__io.text = text;
    var the_console = document.getElementById('console');
    the_console.innerHTML += '<div class="lines"><div ' +
      'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
      '<div class="margin-line"> ' + text + '<div id="var"></div></div></div>';
  }

}
