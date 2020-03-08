import { code } from '../i18n'
import files from './files'

const expectResult = `variables
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

test('return correct name', () => {
  const [name, result, ...rest] = files(code)

  expect(rest.length).toBe(0)
  expect(name).toBe('facilito')
  expect(result).toBe(expectResult)
})
