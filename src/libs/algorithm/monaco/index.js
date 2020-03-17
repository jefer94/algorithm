import { languages, editor } from 'monaco-editor/esm/vs/editor/editor.main'
// import * as lang from './loader'
import { algorithmWord, begin, end, forWord, toWord, variables, transpiler, openBracket, closeBracket, write, read, type } from '../../i18n'

const id = 'algorithm'

export default function () {
  // languages.register({
  //   id,
  //   extensions: ['.alg'],
  //   aliases: ['Algorithm', 'algorithm'],
  //   loader: () => import('./loader')
  // })
  languages.register({ id })
  // console.log({ tokenizer: lang.language.tokenizer })
  // languages.setMonarchTokensProvider(id, { tokenizer: lang.language.tokenizer })
  languages.setMonarchTokensProvider(id, {
    brackets: [
      ['[', ']', 'delimiter.curly'],
      ['(', ')', 'delimiter.curly']
    ],
    tokenizer: {
      root: [
        [new RegExp(`(${[
          ...[algorithmWord, begin, end, forWord, toWord],
          ...variables,
          ...Object.keys(transpiler),
          ...openBracket,
          ...closeBracket,
          ...write,
          ...read,
          ...Object.values(type)
        ].join('|')})`), 'keyword'],
        [/\/\/.*/, 'comment'],
        [/[0-9]+/, 'number'],
        [/(["'])(?:(?=(\\?))\2.)*?\1/, 'string'],
        [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        [/'([^'\\]|\\.)*$/, 'string.invalid'], // non-teminated string
        // [/"/, 'string'],
        // [/'/, 'string'],
        [/\[\(\)\]/, 'delimiter.bracket']
      ]
    }
  })
  editor.defineTheme('custom-vs-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      // { token: 'tokens', foreground: '569cd6' },
      { token: 'comment', foreground: '608b4e' },
      // { token: 'number', foreground: 'b5cea8' },
      { token: 'string', foreground: 'ce9178' }
    ]
  })
  languages.registerCompletionItemProvider(id, {
    provideCompletionItems: () => [{
      label: 'para',
      kind: languages.CompletionItemKind.Text,
      insertText: 'para'
    }, {
      label: 'testing',
      kind: languages.CompletionItemKind.Keyword,
      // eslint-disable-next-line no-template-curly-in-string
      insertText: 'testing(${1:condition})',
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
    }, {
      label: 'ifelse',
      kind: languages.CompletionItemKind.Snippet,
      insertText: [
        // eslint-disable-next-line no-template-curly-in-string
        'if (${1:condition}) {',
        '\t$0',
        '} else {',
        '\t',
        '}'
      ].join('\n'),
      insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: 'If-Else Statement'
    }]
  })
  console.log(languages.getLanguages())
}