import { begin, end, variables, type } from '../i18n'

/** @module libs/algorithm/variables */

export default function (code, store) {
  const literals = ignoreSentences(code)
  const [firstLine, ...lines] = literals.split('\n')
  const [keyword, ...restOfVarLine] = firstLine.split(' ')
  let result = ''
  if (isVarsZone(keyword, restOfVarLine)) Object.keys(lines).map(Number).forEach((key) => {
    const words = lines[key].split(' ')
    // const i = key + 1
    if (lines[key].search('//') !== -1) {
      const remove = lines[key].substr(lines[key].search('//'), lines[key].length)
      lines[key] = lines[key].replace(remove, '')
    }
    Object.keys(words).map(Number).forEach((j) => {
      if (j < words.length - 1) {
        const word = prepareWord(words[j])
        if (word) result += `var ${word};\n`
        if (j !== words.length - 1) reserveVars(store, words[words.length - 1], purgeWord(words[j]))
      }
    })
  })
  return result.split('\n').filter((v) => v).join('\n')
}

function isVarsZone(keyword, restOfVarLine) {
  return variables.indexOf(keyword) !== -1 &&
    (!restOfVarLine.length || restOfVarLine.every((v) => !v))
}

function purgeWord(word) {
  return word
    .replace(/=/g, ' = ')
    .replace(/ /g, '')
    .replace(/\t/g, '')
    .replace(/,/g, '')
    .replace(/:/g, '')
    .replace(/\[[0-9]{1,9}\]/g, '')
}

function prepareWord(word) {
  return word
    .replace(/=/g, ' = ')
    .replace(/ /g, '')
    .replace(/\t/g, '')
    .replace(/,/g, '')
    .replace(/:/g, '')
    .replace(/\[/g, ' = new Vector(')
    .replace(/\]/g, ')')
}

/**
 * Reserve vars in the store.
 *
 * @param {object} store - Store of variables.
 * @param {string} isA - Variable type.
 * @param {string} word - Variable name.
 */
function reserveVars(store, isA, word) {
  switch (isA) {
    case type.int:
      store.varAdd('int', word)
      break
    case type.double:
      store.varAdd('double', word)
      break
    case type.string:
      store.varAdd('string', word)
      break
    case type.bool:
      store.varAdd('bool', word)
      break
    default:
  }
}

/**
 * Ignore algorithm body.
 *
 * @param {string} code
 * @example
 * const code = [
 *   'algorithm easy',
 *   'variables',
 *   '  easy: boolean',
 *   'start',
 *   '   ...',
 *   'end'
 * ].join('\n')
 * ignoreSentences(code)
 * @returns {string} Get the code, less the body (start ... end).
 */
function ignoreSentences(code) {
  return code.replace(code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))[0], '')
}
