var tokens = {
  // algorithm : js
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

// closure algorithm
const Algorithm = () => {
  // functions
  const source = code =>
    code.getValue();

  const title = code => {
    let name = code.match(RegExp(algorithm_word + ' [a-zA-Z]+[a-zA-Z0-9]'));
    if (name.length != 1)
      throw 'Algorithm name is invalid';
    return name.reduce(line => line.replace(RegExp(algorithm_word + ' '), ''))
      return word[1];
  }
  
  const execution = (name, variables, source) => {
    return (code) =>
      Console(name(code), variables(code), source(code))
  }


  const variables = code => {
    var js = '';
    let variables = code.match(/^[ ]*variables[\s\S]*^[ ]*begin/);
    if (variables.length < 3) return '';
    variables.split(/\n/)
      .filter(line => 
        line.search(/^[ ]*variables/) === -1 && 
        line.search(/^[ ]*begin/) === -1 && 
        line != ''
      )
      .map(line => {
        let [type_var, ...vars] = line
          .filter(line => line.match(/^[\t ]*\/\//).length === 0)
          .replace(/\/\/[\s\S]$/, '')
          .reverse();
        vars.split(/ /)
          .map(word => {
            if (word != '') {
              let filter_word = word.replace(/=/g, ' = ');
                .replace(/ /g, '');
                .replace(/\t/g, '');
                .replace(/,/g, '');
                .replace(/:/g, '');
                .replace(/\[/g, ' = new Vector(');
                .replace(/\]/g, ')');
              switch (type_var) {
                case type.int:
                  global.variables[filter_word] = 'int';
                  break;
                case type.double:
                  global.variables[filter_word] = 'double';
                  break;
                case type.string:
                  global.variables[filter_word] = 'string';
                  break;
                case type.bool:
                  global.variables[filter_word] = 'bool';
                  break;
              }
              js = `var = ${filter_word}\n`;
              return filter_word;
            }
          })
      })
  }

  const code = src => {
    var code = src.match(RegExp(begin + '[\\s\\S]*?' + end + '$', 'gm'));
    if (code.length === 0) throw 'code invalid'
    let line = code.split(/\n/)
      .filter(line => 
        line.search(begin) === -1 &&
        line.search(end) === -1 &&
        line.match(/^[\t ]*\/\//).length === 0 &&
        line != ''
      )
      .map(value => {
        let line = value.replace(/\/\/[\s\S]$/, '')
          .replace(/\(/g, ' (')
          .replace(/\)/g, ') ')
          .replace(/[ ]{2,}/g, ' ')
          .replace(/^[ ]+/g, '')
          .replace(/\[/g, '.io(')
          .replace(/\]/g, ')');
        if (/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/.test(line)) {
          let vector = line.replace(/<-/, '')
            .match(/\S+/g)
            .reduce((pre, now, index) => {
              if (index === 1)
                return `${now}.add(`;
              else 
                return `${pre}"${now}")`
            })
          return line.replace(/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/, vector);
        }
        return line;
      })
  }




  const run = execution(title, variables);

  let js = '';
  let code = source(editor);
  global.variables = [];
}
// transform to javascript
scanner () {
  // good in space we are going to make a separation between the code
  // and the variables
  code = this.code.match(RegExp(begin + '[\\s\\S]*?' + end + '$', 'gm'))[0];
  // each line is separated into a array
  var line = code.split('\n');

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
  for (let i in line) {
    // ...
    if (line[i].search('//') != -1) {
      var remove = line[i].substr(line[i].search('//'), line[i].length);
      line[i] = line[i].replace(remove, '');
    }
    line[i] = line[i].replace(/\(/g, ' (');
    line[i] = line[i].replace(/\)/g, ') ');
    line[i] = line[i].replace(/  /g, ' ');
    line[i] = line[i].replace(/\[/g, '.io(');
    line[i] = line[i].replace(/\]/g, ')');


    // vector.io(n).add(value)
    while (line[i].match(/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/)) {
      line[i] = line[i].replace(/<-/, '');
      let exp = line[i].match(/\S+/g);
      line[i] = exp[0] + '.add('
      if (isNaN(+exp[1]))
        line[i] += '"' + exp[1] + '"';
      else
        line[i] += exp[1];
      line[i] += ')';
    }

    if (line[i].substr(0, 1) === ' ') {
      var length = line[i].length - 1;
      line[i] = line[i].substr(1, length);
    }

    var length = line[i].length - 1;
    while (line[i].substr(length, 1) === ' ')
      line[i] = line[i].substr(0, length);

    if (line[i] === '')
      continue;

    // if (x === y)
    for (let i in open_bracket) {
      if (line[i].match(RegExp('=(.)+'+ open_bracket[i]))) {
        console.log('true');
        line[i] = line[i].replace(/=/g, ' === ');
        console.log('true');
      }
    }

    // for (...)
    if (line[i].match(RegExp(`\([\\s\\S]+${to_word}[\\s\\S]+\)`))) {
      console.log(line[i].match(RegExp(`\([\\s\\S]+${to_word}[\\s\\S]+\)`)));
      var conditions_for = line[i].match(RegExp(`\([\\s\\S]+${to_word}[\\s\\S]+\)`))[0];
      conditions_for = conditions_for.split(to_word);
      var ref = line[i].match(RegExp(`\([\\s\\S]+${to_word}[\\s\\S]+\)`))[0];
      ref = ref.split(to_word);
      conditions_for[0] += ';';
      conditions_for[1] = conditions_for[1].replace('=', '<=');
      if (conditions_for[1].search('reversed') === -1)
        conditions_for[1] = conditions_for[1].replace(')', '; i++)');
      else
        conditions_for[1] = conditions_for[1].replace(')', '; i--)');
      line[i] = line[i].replace(ref[0], conditions_for[0]);
      line[i] = line[i].replace(ref[1], conditions_for[1]);
      line[i] = line[i].replace(to_word, '');
    }

    // do ... while (!...)
    if (line[i].match(RegExp(`${to_word}\\s+\([\\s\\S]+\)`))) {
      console.log('enter');
      line[i] = line[i].replace('(', '(!(');
      line[i] = line[i].replace(/\)\s{0,}$/, '))');
      line[i] = line[i].replace(/=/g, '===');
    }

    // each word is separated into a array
    var word = line[i].split(' ');

    // loop is to search in various dictionaries, and transform that code
    for (let i in word) {
      // word[i] = word[i].replace(/=/g, ' === ');
      // dictionaries of words
      // open blackets
      if (open_bracket.indexOf(word[i]) != -1)
        js += '{ ';
      // close brackets
      else if (close_bracket.indexOf(word[i]) != -1)
        js += '}';
      else if (transpiler[word[i]])
          js += transpiler[word[i]] + ' ';
      // dictionaries of tokens
      else if (tokens[word[i]])
        js += tokens[word[i]] + ' ';
      // and words not in the dictionary
      else
        js += word[i] + ' ';
    }
    // fracment of code delete all space in the start of a line
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

    var last_line = js.split('\n')[this.js.split('\n').length - 1];
    if (last_line.search('{') != -1 || last_line.search('}') != -1)
      js += '\n';

    else if (write.indexOf(word[0]) != -1) {
      js = this.js.replace(
        write[write.indexOf(word[0])],
        'eval(write('
      );
      js += '));\n';
    }
    else if (read.indexOf(word[0]) != -1) {
      js = this.js.replace(
      read[read.indexOf(word[0])],
        'eval(read("'
      );
      js += '"));\n';
    }
    else
      js += ';\n';
  }
}
