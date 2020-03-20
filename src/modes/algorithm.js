// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// legacy codemirror algorithm mode
/* eslint-disable */
// import CodeMirror from 'codemirror'

// CodeMirror.defineMode('algorithm.es', () => {
//   function words(str) {
//     const obj = {}; const
//       words = str.split(' ')
//     for (let i = 0; i < words.length; ++i) obj[words[i]] = true
//     return obj
//   }
//   const keywords = words('y arreglo caso constante hacer sino inicio fin para entero ' +
//                        'booleano carapter funcion si mod null no o procedimiento ' +
//                        'finpara finsi finmientras hasta algoritmo ' +
//                        'variables repetir entonces mientras imprimir mostrar leer')
//   const atoms = { null: true }

//   const isOperatorChar = /[+\-*&%=<>!?|/]/

//   function tokenBase(stream, state) {
//     const ch = stream.next()
//     if (ch === '#' && state.startOfLine) {
//       stream.skipToEnd()
//       return 'meta'
//     }
//     if (ch === '"' || ch === "'") {
//       state.tokenize = tokenString(ch)
//       return state.tokenize(stream, state)
//     }
//     if (ch === '(' && stream.eat('*')) {
//       state.tokenize = tokenComment
//       return tokenComment(stream, state)
//     }
//     if (/[[\]{}(),;:.]/.test(ch)) return null

//     if (/\d/.test(ch)) {
//       stream.eatWhile(/[\w.]/)
//       return 'number'
//     }
//     if (ch === '/') if (stream.eat('/')) {
//       stream.skipToEnd()
//       return 'comment'
//     }

//     if (isOperatorChar.test(ch)) {
//       stream.eatWhile(isOperatorChar)
//       return 'operator'
//     }
//     stream.eatWhile(/[\w$_]/)
//     const cur = stream.current()
//     if (keywords.propertyIsEnumerable(cur)) return 'keyword'
//     if (atoms.propertyIsEnumerable(cur)) return 'atom'
//     return 'variable'
//   }

//   function tokenString(quote) {
//     return function (stream, state) {
//       let escaped = false; let next; let
//         end = false
//       while ((next = stream.next()) !== null) {
//         if (next === quote && !escaped) {
//           end = true; break
//         }
//         escaped = !escaped && next === '\\'
//       }
//       if (end || !escaped) state.tokenize = null
//       return 'string'
//     }
//   }

//   function tokenComment(stream, state) {
//     let maybeEnd = false; let
//       ch
//     while (ch = stream.next()) {
//       if (ch === ')' && maybeEnd) {
//         state.tokenize = null
//         break
//       }
//       maybeEnd = ch === '*'
//     }
//     return 'comment'
//   }

//   // Interface

//   return {
//     startState() {
//       return { tokenize: null }
//     },

//     token(stream, state) {
//       if (stream.eatSpace()) return null
//       const style = (state.tokenize || tokenBase)(stream, state)
//       if (style === 'comment' || style === 'meta') return style
//       return style
//     },

//     electricChars: '{}'
//   }
// })

// CodeMirror.defineMIME('text/x-algorithm', 'algorithm')
// /* eslint-enable */
