class Type {
  register(variable) {
    this.variable.push(variable);
  }
  is_the_right_type () {
    setTimeout(() => {
      for (var i = 0; i < this.variable.length; i++) {
        if (this.type != "number" && this.type != "bool") {
          if (typeof eval(this.variable[i]) != this.type) {
           throw "error dato invalido en esta variable " + this.variable[i];
          }
        }
        else  if (this.type == "int") {
          if (typeof eval(this.variable[i]) != "number" && eval(this.variable[i])/2 != 0)
            throw "error dato invalido en esta variable " + this.variable[i];
        }
        else if (this.type == "double") {
          if (typeof eval(this.variable[i]) == "number")
            throw "error dato invalido en esta variable " + this.variable[i];
        }
        else if (this.type == "bool") {
          if (typeof eval(this.variable[i]) != "true" || typeof eval(this.variable[i]) == "false")
            throw "error dato invalido en esta variable " + this.variable[i];
        }
      }
    }, 100);
  }
}
class Int extends Type {
  constructor() {
    super();
    this.variable = [];
    this.type = "int";
  }
}
class Double extends Type {
  constructor() {
    super();
    this.variable = [];
    this.type = "double";
  }
}
class Char extends Type {
  constructor() {
    super();
    this.variable = [];
    this.type = "string";
  }
}
class Bool extends Type {
  constructor() {
    super();
    this.variable = [];
    this.type = "bool";
  }
}
