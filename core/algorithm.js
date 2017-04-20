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
var algorithm = new class {
  constructor () {
    this.js = '';
    global.variables = [];
  }
  // transform to javascript
  to_js () {
    this.js = '';
    // get container result in a var
    this.code = editor.getValue();
    // get container of box executor
    this.console = document.getElementById('console');

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
    var literals = this.code.replace(
      this.code.match(RegExp(begin + '[\\s\\S]*?' + end + '$', 'gm'))[0], '');
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
        while (word[j] || word[j] === '') {
          // last test
          word[j] = word[j].replace(/=/g, ' = ');
          word[j] = word[j].replace(/ /g, '');
          word[j] = word[j].replace(/\t/g, '');
          word[j] = word[j].replace(/,/g, '');
          word[j] = word[j].replace(/:/g, '');
          word[j] = word[j].replace(/\[/g, ' = new Vector(');
          word[j] = word[j].replace(/\]/g, ')');
          if (j < word.length - 1) {
            if (word[j] !== '')
              code += 'var ' + word[j] + ';\n';
            switch (word[word.length - 1]) {
            case type.int:
              global.variables[word[j]] = 'int';
              break;
            case type.double:
              global.variables[word[j]] = 'double';
              break;
            case type.string:
              global.variables[word[j]] = 'string';
              break;
            case type.bool:
              global.variables[word[j]] = 'bool';
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
    this.code = this.code.match(RegExp(begin + '[\\s\\S]*?' + end + '$', 'gm'))[0];
    // each line is separated into a array
    var line = this.code.split('\n');

    // the word "fin" is deleted
    if (line[line.length - 1].search(end) != -1)
      line.pop();

    // reverse the line of array
    line.reverse();
    // the word "inicio" is deleted
    if (line[line.length - 1].search(begin) != -1)
      line.pop();

    // reverse the line of array
    line.reverse();

    // now the transpiler work
    for (i in line) {
      if (line[i].search('//') != -1) {
        var remove = line[i].substr(line[i].search('//'), line[i].length);
        line[i] = line[i].replace(remove, '');
      }
      line[i] = line[i].replace(/\(/g, ' (');
      line[i] = line[i].replace(/\)/g, ') ');
      line[i] = line[i].replace(/  /g, ' ');

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
        word[i] = word[i].replace(/=/g, ' === ');
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
  }
}
