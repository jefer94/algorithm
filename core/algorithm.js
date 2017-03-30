var tokens = {
	// algorithm : js
  '='          : '===',
  '<>'         : '!==',
  '<='         : '<=',
  '>='         : '>=',
  '<'          : '<',
  '>'          : '>',
  '<-'         : '=',
  '<='         : '=',
	'o'          : '||',
	'y'          : '&&',
	'no'         : '!'
};
var the_console = new Console();
class Algorithm {
  constructor () {
    this.js = '';
    window.__variables = [];
  }
  // transform to javascript
  to_js () {
    this.js = '';
    // get container result in a var
    this.code = editor.getValue();
    // get container of box executor
    this.console = document.getElementById('console');

    // add this value in the log
    // result.innerHTML += execute.value + '<div class="lines"><div class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> <div class="margin-line"> algorithm run unname.js</div></div>'
    // and execute a interpreter
    var title = this.title();
    var literals = this.literals();
    this.scanner();

    // show the output
    the_console.run(title, literals, this.js);
  }
  // search the title of de algorithm
  title () {
    var line = this.code.split('\n');
    var word = line[0].split(' ');
		console.log(word[0] + ' ' + algorithm_word);
    if (word[0] == algorithm_word && word.length == 2) {
      var code_to_return = '';
      for (var i = 1; i < line.length; i++)
        code_to_return += line[i] + '\n';

      this.code = code_to_return;
      return word[1];
    }
    else
      throw 'name is invalid';
  }
  literals () {
    var literals = this.code.replace(this.code.match(/inicio[\s\S]*?fin$/gm)[0], '');
    var line = literals.split('\n');
    var code = '';
    if (variables.indexOf(line[0].split(' ')[0]) != -1) {
      var i = 0;
      var k = 0;
      while (line[i]) {
        var word = line[i].split(' ');
        i++;
        var j = 0;
        if (line[i].search('//') != -1) {
          var remove = line[i].substr(line[i].search('//'), line[i].length);
          line[i] = line[i].replace(remove, '');
        }
        /*
        for (k in word) {
          if (word[k] === '') word.splice(k, 1);
        }*/
        while (word[j] || word[j] === '') {
          // last test
          while (word[j].search('=') != -1)
            word[j] = word[j].replace('=', ' = ');

          while (word[j].search(' ') != -1)
            word[j] = word[j].replace(' ', '');

          while (word[j].search('\t') != -1)
            word[j] = word[j].replace('\t', '');

          while (word[j].search(',') != -1)
            word[j] = word[j].replace(',', '');

          while (word[j].search(':') != -1)
            word[j] = word[j].replace(':', '');

          if (j < word.length - 1) {
            if (word[j] !== '')
              code += 'var ' + word[j] + ';\n';
            switch (word[word.length - 1]) {
            case type.int:
              window.__variables[word[j]] = 'int';
              break;
            case type.double:
              window.__variables[word[j]] = 'double';
              break;
            case type.string:
              window.__variables[word[j]] = 'string';
              break;
            case type.bool:
              window.__variables[word[j]] = 'bool';
              break;
            default:
            }
          }
          j++;
        }
      }
    }
    else
      console.error('variables not exist');
    return code;
  }
  // transform between native languaje and javascipt
  scanner () {
    // good in this space we are going to make a separation between the code
    // and the variables

    this.code = this.code.match(/inicio[\s\S]*?fin$/gm)[0];
    // each line is separated into a array
    var line = this.code.split('\n');
    // the word "fin" is deleted
    if (line[line.length - 1].search('fin') != -1)
      line.pop();

    // reverse the line of array
    line.reverse();
    // the word "inicio" is deleted
    if (line[line.length - 1].search('inicio') != -1)
      line.pop();

    // reverse the line of array
    line.reverse();

    // now the transpiler work
    for (i in line) {
      if (line[i].search('//') != -1) {
        var remove = line[i].substr(line[i].search('//'), line[i].length);
        line[i] = line[i].replace(remove, '');
      }
      while (line[i].search('  ') != -1)
        line[i] = line[i].replace('  ', ' ');

      if (line[i].substr(0, 1) === ' ') {
        var length = line[i].length - 1;
        line[i] = line[i].substr(1, length);
      }

      var length = line[i].length - 1;
      while (line[i].substr(length, 1) === ' ')
        line[i] = line[i].substr(0, length);

      if (line[i] === '')
        continue;

			// if (!line[i]) break;
      // each word is separated into a array
      var word = line[i].split(' ');
      // this loop is to search in various dictionaries, and transform that code
      for (var i in word) {
        if (word[i].search('=') != -1)
          word[i] = word[i].replace('=', ' === ');
        // dictionaries of words
				// open blackets
        if (open_bracket.indexOf(word[i]) != -1)
          this.js += '{ ';
				// close brackets
        else if (close_bracket.indexOf(word[i]) != -1)
          this.js += '}';
        else if (transpiler[word[i]])
          this.js += transpiler[word[i]] + ' ';
        // dictionaries of tokens
        else if (tokens[word[i]])
          this.js += tokens[word[i]] + ' ';
				// and words not in the dictionary
        else
          this.js += word[i] + ' ';
      }
			// console.log(this.js);
      // this fracment of code delete all space in the start of a line
      // with a style like stack, first reverse the array
      word.reverse();
      // then in space_in_start assign the last element in the stack
      var space_in_start = word.pop();
      var if_no_have_a_space_in_start = space_in_start;
      // while it is equal at ""
      while (space_in_start == '')
        // assign at space_in_start the last element in the stack
        space_in_start = word.pop();

      // the last element never is ""
      if (typeof space_in_start === 'undefined')
        word.push(if_no_have_a_space_in_start);
      else
        word.push(space_in_start);
      // and reverse the array again to finish
      word.reverse();

      var last_line = this.js.split('\n')[this.js.split('\n').length - 1];
      if (last_line.search('{') != -1 || last_line.search('}') != -1)
        this.js += '\n';

      else if (write.indexOf(word[0]) != -1) {
        this.js = this.js.replace(
					write[write.indexOf(word[0])],
					'eval(write('
				);
        this.js += '));\n';
      }
      else if (read.indexOf(word[0]) != -1) {
        this.js = this.js.replace(
				read[read.indexOf(word[0])],
					'eval(read("'
				);
        this.js += '"));\n';
      }
      else
        this.js += ';\n';
    }
    // this.js = this.js.match( /inicio[\s\S]*?fin/gm )[0].replace("inicio","").replace("fin","");
    // console.log(this.js);
  }
}

// instance of mechanic
var algorithm = new Algorithm;
