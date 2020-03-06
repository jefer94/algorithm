export const algorithmWord = 'algoritmo'
export const begin = 'inicio'
export const end = 'fin'
export const forWord = 'para'
export const toWord = 'hasta'

export const tokens = {
  o: '||',
  y: '&&',
  no: '!',
  '<>': '!==',
  '<=': '<=',
  '>=': '>=',
  '<': '<',
  '>': '>',
  '<-': '='
}

export const variables = [
  // map
  'variables',
  'var'
]

export const transpiler = {
  // algorithm : js
  si: 'if',
  sino: '}\nelse {',
  mientras: 'while',
  repetir: 'do {',
  hasta: '} while',
  para: 'for',
  hacer: 'do'
}

export const openBracket = [
  // map
  'hacer',
  'entonces'
]

export const closeBracket = [
  // map
  'finsi',
  'fin_si',
  'finmientras',
  'fin_mientras',
  'finpara',
  'fin_para'
]

export const write = [
  // map
  'mostrar',
  'escribir',
  'imprimir'
]

export const read = [
  // map
  'leer'
]

export const type = {
  // type : algorithm
  int: 'entero',
  double: 'real',
  string: 'carapter',
  bool: 'booleano'
}

export const typeError = {
  // type : string in es
  int: 'ERROR: no es entero',
  double: 'ERROR: no es flotante',
  string: 'ERROR: no es una cadena',
  bool: 'ERROR: no es booleano'
}

export const error = {
  // error name     : string in es
  stringForNumber: 'ERROR: un numero no puede multiplicar a un carapter',
  infinity: 'ERROR: dividir entre 0 causa un numero infinito'
}

export const code = `algoritmo facilito
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

export default {
  algorithmWord,
  begin,
  end,
  forWord,
  toWord,
  tokens,
  variables,
  transpiler,
  openBracket,
  closeBracket,
  write,
  read,
  type,
  typeError,
  error,
  code
}
