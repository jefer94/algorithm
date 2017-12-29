const algorithm_word = 'algoritmo'
const begin = 'inicio'
const end = 'fin'
const for_word = 'para'
const to_word = 'hasta'

var tokens = {
  // algorithm : js
  'o': '||',
  'y': '&&',
  'no': '!',
  '<>': '!==',
  '<=': '<=',
  '>=': '>=',
  '<': '<',
  '>': '>',
  '<-': '='
}

const variables = [
  // map
  'variables',
  'var'
]

const transpiler = {
  // algorithm : js
  'si': 'if',
  'sino': '}\nelse {',
  'mientras': 'while',
  'repetir': 'do {',
  'hasta': '} while',
  'para': 'for',
  'hacer': 'do'
}

const open_bracket = [
  // map
  'hacer',
  'entonces'
]

const close_bracket = [
  // map
  'finsi',
  'fin_si',
  'finmientras',
  'fin_mientras',
  'finpara',
  'fin_para'
]

const write = [
  // map
  'mostrar',
  'escribir',
  'imprimir'
]

const read = [
  // map
  'leer'
]

const type = {
  // type : algorithm
  int: 'entero',
  double: 'real',
  string: 'carapter',
  bool: 'booleano'
}

const type_error = {
  // type : string in es
  int: 'ERROR: no es entero',
  double: 'ERROR: no es flotante',
  string: 'ERROR: no es una cadena',
  bool: 'ERROR: no es booleano'
}

const error = {
  // error name     : string in es
  string_for_number: 'ERROR: un numero no puede multiplicar a un carapter',
  infinity: 'ERROR: dividir entre 0 causa un numero infinito'
}

const code = `algoritmo facilito
variables
numero, i, tabla[10]: entero
inicio
  i <- 0
  mostrar "Ingrese numero a multiplicar: "
  leer numero
  mientras (i < 10) hacer
    i <- i + 1
    tabla[i] <- numero * i
    mostrar numero, " * ", i, " = ", numero * i
  finmientras
fin`

export default { algorithm_word,
  begin,
  end,
  for_word,
  to_word,
  tokens,
  variables,
  transpiler,
  open_bracket,
  close_bracket,
  write,
  read,
  type,
  type_error,
  error,
  code }

export { algorithm_word, begin, end, for_word, to_word, tokens, variables,
  transpiler, open_bracket, close_bracket, write, read, type, type_error,
  error, code }
