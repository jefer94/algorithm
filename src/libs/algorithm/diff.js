import { begin } from '../i18n'

export default function (code, js) {
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
