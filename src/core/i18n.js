import es from '../lang/es'

// import language
const locale = window.navigator.language.substr(0, 2)

const lang = locale === 'es' ?
  es :
  es

// proxy
const algorithm_word = lang.algorithm_word
const begin = lang.begin
const end = lang.end
const for_word = lang.for_word
const to_word = lang.to_word
const tokens = lang.tokens
const variables = lang.variables
const transpiler = lang.transpiler
const open_bracket = lang.open_bracket
const close_bracket = lang.close_bracket
const write = lang.write
const read = lang.read
const type = lang.type
const type_error = lang.type_error
const error = lang.error
const code = lang.code

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
