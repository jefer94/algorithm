var tokens = {
  // js           // native
  "=":          "==",
  "<>":         "=!",
  "<=":         "<=",
  ">=":         ">=",
  "<":          "<",
  ">":          ">"
}

class Algorithm {
  constructor() {
    this.js = "";
  }
  // transform to javascript
  to_js(event) {
    // if event not exist or the method keyCode from event is equal at 13
    if (typeof event == "undefined" || event.keyCode == 13) {
      // get container result in a var
      var result = document.getElementById("result");
      // get container of box executor
      var execute = document.getElementById("execute");

      // add this value in the log
      result.innerHTML += execute.value + "<br>";
      // and execute a interpreter
      this.scanner();
      // to finish to clean execute box
      execute.value = "";

      return false;
    }
    else {
      return true;
    }
  }
  // transform between native languaje and javascipt
  scanner() {
    // each word is separated into a array
    var word = execute.value.split(" ");
    //console.log(word);
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
    this.js += "<br>";
    // get container result in a var
    var result = document.getElementById("result");
    // add this value in the log
    result.innerHTML = this.js;

    console.log(this.js);
  }
}

// instance of mechanic
var algorithm = new Algorithm;
