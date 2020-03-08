import es from '../lang/es'

// import language
const locale = window.navigator.language.substr(0, 2)

const lang = locale === 'es' ?
  es :
  es

export const staticTokens = {
  // algorithm : js
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

// proxy
export const { algorithmWord } = lang
export const { begin } = lang
export const { end } = lang
export const { forWord } = lang
export const { toWord } = lang
export const tokens = Object.assign(staticTokens, lang.tokens)
export const { variables } = lang
export const { transpiler } = lang
export const { openBracket } = lang
export const { closeBracket } = lang
export const { write } = lang
export const { read } = lang
export const { type } = lang
export const { typeError } = lang
export const { error } = lang
export const { code } = lang

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
