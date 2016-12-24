var tokens = {
  // js           // native
  "=":          "==",
  "<>":         "!=",
  "<=":         "<=",
  ">=":         ">=",
  "<":          "<",
  ">":          ">"
}
var the_console = new Console();
class Algorithm {
  constructor() {
    this.js = "";
  }
  // transform to javascript
  to_js() {
    this.js = "";
    // get container result in a var
    this.code = editor.getValue();
    // get container of box executor
    this.console = document.getElementById("console");

    // add this value in the log
    //result.innerHTML += execute.value + '<div class="lines"><div class="CodeMirror-linenumber CodeMirror-gutter-elt arrow">&gt;</div> <div class="margin-line"> algorithm run unname.js</div></div>'
    // and execute a interpreter
    var title = this.title();
    this.scanner();

    // show the output
    the_console.run(title, this.js);
  }
  // search the title of de algorithm
  title() {
    var line = this.code.split("\n");
    var word = line[0].split(" ");
    if (word[0] == "algoritmo" && word.length == 2) {
      var code_to_return = "";
      for (var i=1; i < line.length-1; i++) {
        code_to_return += line[i] + "\n";
      }
      this.code = code_to_return;
      return word[1]
    }
    else
      throw "name is invalid";
  }
  // transform between native languaje and javascipt
  scanner() {
    // each line is separated into a array
    var line = this.code.split("\n");
    for (i in line){
      // each word is separated into a array
      var word = line[i].split(" ");
      // this loop is to search in various dictionaries, and transform that code
      for (var i in word) {
        // dictionaries of words
        if (transpiler[word[i]])
          this.js += transpiler[word[i]] + " ";
        // dictionaries of tokens
        else if (tokens[word[i]])
          this.js += tokens[word[i]] + " ";
        // and words not in the dictionary
        else
          this.js += word[i] + " ";
      }

      // this fracment of code delete all space in the start of a line
      // with a style like stack, first reverse the array
      word.reverse();
      //then in space_in_start assign the last element in the stack
      var space_in_start = word.pop();
      var if_no_have_a_space_in_start = space_in_start;
      // while it is equal at ""
      while (space_in_start == "") {
        //assign at space_in_start the last element in the stack
        space_in_start = word.pop();
      }
      // the last element never is ""
      if (typeof space_in_start == "undefined")
        word.push(if_no_have_a_space_in_start);
      else
        word.push(space_in_start);
      // and reverse the array again to finish
      word.reverse();

      var last_line = this.js.split("\n")[this.js.split("\n").length-1];
      if (last_line.search("{") != -1 || last_line.search("}") != -1) {
        this.js += "\n";
      }
      else if (word[0].search("mostrar") != -1 || word[0].search("imprimir") != -1) {
        this.js = this.js.replace("mostrar", "write(");
        this.js = this.js.replace("imprimir", "write(");
        this.js += ");\n";
      }
      else if (word[0].search("leer") != -1) {
        this.js = this.js.replace("leer", "read(\"");
        this.js += "\");\n";
      }
      else {
        this.js += ";\n";
      }
    }
    //console.log(this.js);
  }
}

// instance of mechanic
var algorithm = new Algorithm;
