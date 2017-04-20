var algorithm_word = 'algoritmo';
var begin = 'inicio';
var end = 'fin';

var variables = [
	// map
	'variables',
	'var'
]

var transpiler = {
	// algorithm : js
  'si'         : 'if',
  'sino'       : 'else',
  'mientras'   : 'while',
  'para'       : 'for',
  'hacer'      : 'do'
};

var open_bracket = [
	// map
  'reperir',
  'hacer',
  'entonces'
];

var close_bracket = [
	// map
  'finsi',
  'fin_si',
  'finmientras',
  'fin_mientras',
  'finpara',
  'fin_para'
];

var write = [
	// map
  'mostrar',
  'escribir',
  'imprimir'
];

var read = [
	// map
  'leer'
];

var type = {
	// type : algorithm
	int     : 'entero',
	double  : 'real',
	string  : 'carapter',
	bool    : 'booleano'
};

var type_error = {
	// type : string in es
	int     : 'ERROR: no es entero',
	double  : 'ERROR: no es flotante',
	string  : 'ERROR: no es una cadena',
	bool    : 'ERROR: no es booleano'
};

var error = {
	// error name     : string in es
	string_for_number : 'ERROR: un numero no puede multiplicar a un carapter',
	infinity          : 'ERROR: dividir entre 0 causa un numero infinito'
};
