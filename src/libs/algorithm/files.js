import { algorithmWord } from '../i18n'

export default function (code) {
  const [firstLine, ...lines] = code.split('\n')
  const [keyword, name, ...restOfWords] = firstLine.split(' ')
  if (keyword === algorithmWord && name && restOfWords.length === 0) return [name, lines.join('\n')]
  throw new Error('name is invalid')
}
