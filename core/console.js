'use strict';
var the_console = new class {
  run (title, literals, code) {
    var the_console = document.getElementById('console');
    the_console.innerHTML = '';
    var read = this.read;
    var write = this.write;
    /* non-existent code for name of algorithm */
    the_console.innerHTML += '<div class="lines"><div class="CodeMirror-linenumber ' +
      'CodeMirror-gutter-elt arrow">&gt;</div> <div class="margin-line"> ' +
      'algorithm run ' + title + '.js</div></div>';
    // show console before of prompt
    console.log(literals + code);
    /*
    setTimeout(() => {
      try {
        eval(literals + code);
      }
      catch(e) {
        write(e.message);
        return -1;
      }
    }, 300);
    */
    // use this eval for debug errors
    eval(literals + code);
  }
  read (to_read) {
    // flags
    var vector = false;
    // clean up unnecessary signs
    while (to_read.substr(0, 1) === ' ') {
      var length = to_read.length - 1;
      to_read = to_read.substr(1, length);
    }
    while (to_read.substr(to_read.length - 1, 1) === ' ')
      to_read = to_read.substr(0, to_read.length - 1);

    var input;
    if (global.io.text && global.io.text != global.io.last_text) {
      global.io.last_text = global.io.text;
      input = prompt(global.io.text);
    }
    else
      input = prompt('');
    var the_console = document.getElementById('var');
    // if var not exist, this not work
    the_console.innerHTML += input;
    the_console.id = '';
    if (typeof to_read === 'object')
      return `${to_read} = ${input};`;
    // vector
    else if (to_read.search(/\.io\(/)) {
      vector = true;
      to_read += '.add()';
    }
    // here in runtime show the mistakes in assignings
    switch (global.variables[to_read]) {
      case 'int':
        if (isNaN(Number(input)) || input != Math.trunc(input))
          return `write(\'${type_error.int}\'); global.io.show = false ;`;
        break;
      case 'double':
        if (isNaN(Number(input)))
          return `write(\'${type_error.double}\'); global.io.show = false ;`;
        break;
      case 'string':
        break;
      case 'bool':
        if (isNaN(Number(input)) || input < 0 || input > 2)
          return `write(\'${type_error.bool}\'); global.io.show = false ;`;
        break;
    }
    if (global.variables[to_read] == 'string') {
      return `${to_read} = \'${input}\';`;
    }
    else if (vector) {
      return `${to_read};`;
    }
    else {
      return `${to_read} = ${input};`;
    }
  }
  write (text) {
    // global.io.show is a flag, this avoids execution after errors
    if (global.io.show) {
      if (typeof text === 'object' && eval(text + '.is_vector()')) {
        text = eval(text + '.show()');
      }
      if (typeof text === 'number' && isNaN(text))
        return `write(\'${error.string_for_number}\'); global.io.show = false ;`;
      if (typeof text === 'number' && !isFinite(text))
        return `write(\'${error.infinity}\'); global.io.show = false ;`;
      if (global.io.last_text === text)
          global.io.last_text = '';
      global.io.text = text;
      var the_console = document.getElementById('console');
      the_console.innerHTML += '<div class="lines"><div ' +
        'class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> ' +
        '<div class="margin-line"> ' + text + '<div id="var" class="var"></div></div></div>';
    }
  }
}
