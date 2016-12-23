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
    this.scanner();

    // show the output
    the_console.run(this.js);
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
