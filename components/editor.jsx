const code = `algoritmo facilito
variables
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

const Editor = () => (
  <textarea id="code" name="code" className="caja toolbox-space">{code}</textarea>;
)

export default Editor;
