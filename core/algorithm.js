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

  }
  to_js(event) {
    if (typeof event == "undefined" || event.keyCode == 13) {
      var result = document.getElementById("result");
      var execute = document.getElementById("execute");

      result.innerHTML += execute.value + "<br>";
      this.scanner();
      execute.value = "";

      return false;
    }
    else {
      return true;
    }
  }
  scanner() {
    var word = execute.value.split(" ");
    console.log(word);
    for (var i in word) {
      if (transpiler[word[i]]) console.log(transpiler[word[i]]);
      else if (tokens[word[i]]) console.log(tokens[word[i]]);
      else console.log(word[i]);
    }
  }
}

var algorithm = new Algorithm;
