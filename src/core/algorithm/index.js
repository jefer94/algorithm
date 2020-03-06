// import _ from 'lodash'
// import store from '../reducers'
import { addVar, resetVar } from '../../actions'
import { algorithmWord, begin, end, toWord, tokens, variables,
  transpiler, openBracket, closeBracket, write, read, type } from '../i18n'

function joinCodes(tabs) {
  return tabs
    .reverse()
    .map((value) => value.content)
    .join()
}

function diff(code, js) {
  const alg = code
    .split(/\n/)
  let beginIndex = 1
  while (alg[beginIndex].match(RegExp(begin)) === null) beginIndex++

  beginIndex++

  const localJS = js
    .split(/\n/)
  let jsIndex = 0
  while (/var/.test(localJS[jsIndex])) jsIndex++

  return beginIndex - jsIndex
}

const algorithm = new class {
  setDispatch(dispatch) {
    this.store = {
      varAdd: (value, key) => dispatch(addVar(value, key)),
      varReset: () => dispatch(resetVar())
    }
  }

  setTabs(tabs) {
    this.tabs = tabs
  }

  // transform to javascript
  toJS() {
    this.store.varReset()
    this.js = ''

    // get container result in a var
    console.log(this.tabs, 'tabs')

    // and execute a interpreter
    const codesInString = joinCodes(this.tabs)
    const title = this.title(codesInString)
    const literals = this.literals()
    const diffCode = diff(codesInString, literals + this.js)
    const map = this.tabs.map((v) => v.content)

    // show the output
    const code = this.js
    return {
      title,
      literals,
      code,
      diff: diffCode,
      map
    }
    // theConsole.run(title, literals, this.js, diff, map)
  }

  // search the title of de algorithm
  title(code) {
    const line = code.split('\n')
    const word = line[0].split(' ')
    if (word[0] === algorithmWord && word.length === 2) {
      let codeToReturn = ''
      for (let i = 1; i < line.length; i++) codeToReturn += `${line[i]}\n`

      this.code = codeToReturn
      return word[1]
    }
    throw new Error('name is invalid')
  }

  literals() {
    const literals = this.code.replace(
      this.code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))[0], ''
    )
    const line = literals.split('\n')
    let code = ''
    if (variables.indexOf(line[0].split(' ')[0]) !== -1) {
      let i = 0
      while (line[i]) {
        const word = line[i].split(' ')
        i++
        let j = 0
        if (line[i].search('//') !== -1) {
          const remove = line[i].substr(line[i].search('//'), line[i].length)
          line[i] = line[i].replace(remove, '')
        }
        while (word[j] || word[j] === '') {
          // last test
          word[j] = word[j]
            .replace(/=/g, ' = ')
            .replace(/ /g, '')
            .replace(/\t/g, '')
            .replace(/,/g, '')
            .replace(/:/g, '')
            .replace(/\[/g, ' = new Vector(')
            .replace(/\]/g, ')')
          if (j < word.length - 1) {
            if (word[j] !== '') code += `var ${word[j]};\n`
            word[j] = word[j].replace(/ =[\s\S]{0,}/, '')
            switch (word[word.length - 1]) {
              case type.int:
                this.store.varAdd('int', word[j])
                break
              case type.double:
                this.store.varAdd('double', word[j])
                break
              case type.string:
                this.store.varAdd('string', word[j])
                break
              case type.bool:
                this.store.varAdd('bool', word[j])
                break
              default:
            }
          }
          j++
        }
      }
    }
    else throw new Error('variables not exist')
    return code
  }

  // transform between native languaje and javascipt
  scanner() {
    // good in this space we are going to make a separation between the code
    // and the variables
    [this.code] = this.code.match(RegExp(`${begin}[\\s\\S]*?${end}$`, 'gm'))
    // each line is separated into a array
    const line = this.code.split('\n')

    // the word "fin" is deleted
    if (line[line.length - 1].search(end) !== -1) line.pop()

    // reverse the line of array
    line.reverse()
    // the word "inicio" is deleted
    if (line[line.length - 1].search(begin) !== -1) line.pop()

    // reverse the line of array
    line.reverse()

    // now the transpiler work

    Object.keys(line).forEach((i) => {
      // ...
      if (line[i].search('//') !== -1) {
        const remove = line[i].substr(line[i].search('//'), line[i].length)
        line[i] = line[i].replace(remove, '')
      }
      line[i] = line[i]
        .replace(/\(/g, ' (')
        .replace(/\)/g, ') ')
        .replace(/ {2}/g, ' ')
        .replace(/\[/g, '.io(')
        .replace(/\]/g, ')')

      // vector.io(n).add(value)
      while (line[i].match(/\.io\([0-9a-zA-Z]+\)\s+<-\s+[a-zA-Z0-9 ]/)) {
        line[i] = line[i].replace(/<-/, '')
        const exp = line[i].match(/\S+/g)
        line[i] = `${exp[0]}.add(`
        if (Number.isNaN(+exp[1])) line[i] += `"${exp[1]}"`
        else line[i] += exp[1]
        line[i] += ')'
      }

      if (line[i].substr(0, 1) === ' ') {
        const length = line[i].length - 1
        line[i] = line[i].substr(1, length)
      }

      const length = line[i].length - 1
      while (line[i].substr(length, 1) === ' ') line[i] = line[i].substr(0, length)

      if (line[i] === '') return

      // if (x === y)
      Object.keys(line).forEach((key) => {
        if (line[key].match(RegExp(`=(.)+${openBracket[key]}`))) line[key] = line[key].replace(/=/g, ' === ')
      })

      // for (...)
      if (line[i].match(RegExp(`([\\s\\S]+${toWord}[\\s\\S]+)`))) {
        let conditionsFor = line[i].match(RegExp(`([\\s\\S]+${toWord}[\\s\\S]+)`))[0]
        conditionsFor = conditionsFor.split(toWord)
        let ref = line[i].match(RegExp(`([\\s\\S]+${toWord}[\\s\\S]+)`))[0]
        ref = ref.split(toWord)
        conditionsFor[0] += ';'
        conditionsFor[1] = conditionsFor[1].replace('=', '<=')
        if (conditionsFor[1].search('reversed') === -1) conditionsFor[1] = conditionsFor[1].replace(')', '; i++)')
        else conditionsFor[1] = conditionsFor[1].replace(')', '; i--)')
        line[i] = line[i].replace(ref[0], conditionsFor[0])
        line[i] = line[i].replace(ref[1], conditionsFor[1])
        line[i] = line[i].replace(toWord, '')
      }

      // do ... while (!...)
      if (line[i].match(RegExp(`${toWord}\\s+([\\s\\S]+)`))) {
        line[i] = line[i].replace('(', '(!(')
        line[i] = line[i].replace(/\)\s{0,}$/, '))')
        line[i] = line[i].replace(/=/g, '===')
      }

      // each word is separated into a array
      const word = line[i].split(' ')

      // this loop is to search in various dictionaries, and transform that code
      Object.keys(word).forEach((key) => {
        // word[key] = word[key].replace(/=/g, ' === ')
        // dictionaries of words
        // open blackets
        if (openBracket.indexOf(word[key]) !== -1) this.js += '{ '
        // close brackets
        else if (closeBracket.indexOf(word[key]) !== -1) this.js += '}'
        else if (transpiler[word[key]]) this.js += `${transpiler[word[key]]} `
        // dictionaries of tokens
        else if (tokens[word[key]]) this.js += `${tokens[word[key]]} `
        // and words not in the dictionary
        else this.js += `${word[key]} `
      })

      // this fracment of code delete all space in the start of a line
      // with a style like stack, first reverse the array
      word.reverse()
      // then in spaceInStart assign the last element in the stack
      let spaceInStart = word.pop()
      const ifNoHaveSpaceInStart = spaceInStart
      // while it is equal at ""
      // assign at spaceInStart the last element in the stack
      while (spaceInStart === '') spaceInStart = word.pop()

      // the last element never is ""
      if (typeof spaceInStart === 'undefined') word.push(ifNoHaveSpaceInStart)
      else word.push(spaceInStart)
      // and reverse the array again to finish
      word.reverse()

      const lastLine = this.js.split('\n')[this.js.split('\n').length - 1]
      if (lastLine.search('{') !== -1 || lastLine.search('}') !== -1) this.js += '\n'

      else if (write.indexOf(word[0]) !== -1) {
        this.js = this.js.replace(
          write[write.indexOf(word[0])],
          'eval(write('
        )
        this.js += '));\n'
      }
      else if (read.indexOf(word[0]) !== -1) {
        this.js = this.js.replace(
          read[read.indexOf(word[0])],
          'eval(read("'
        )
        this.js += '"));\n'
      }
      else this.js += ';\n'
    })
  }
}()

export default algorithm
