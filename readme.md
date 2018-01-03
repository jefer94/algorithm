[![npm](https://img.shields.io/npm/v/npm.svg)](https://github.com/jefer94/algorithm)
[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![chat][chat]][chat-url]
[![downloads][downloads]][downloads-url]

<div align="center">
  <a href="https://github.com/jefer94/algorithm">
    <img width="400"
      src="https://img.shields.io/badge/choco-algorithm-green.svg?style=for-the-badge&colorA=21252b&colorB=568af2">
  </a>
  <h1>Choco Algorithm</h1>
  <p>Algorithm runtime emulator, like a IDE.</p>
</div>

<h2 align="center">Install</h2>

```bash
git clone https://github.com/jefer94/algorithm
cd algorithm
npm install -D
npm run dev
```

<h2 align="center">Only use</h2>

```bash
git clone https://github.com/jefer94/algorithm
cd algorithm
# Now open the index.html in your web browser.
```

<h2 align="center">Usage</h2>

Algorithm provide you, a transpiler, in it can write algorithms.

![Write algorithm](https://lh4.googleusercontent.com/8ae1PHo04V8Oji5-1tadzmU0x_MSZ9s8xz3ugQVGMw9cFushwvQ2vsCrEwHIpnCIFqHYiOw8GedLk5vUt9aN=w1364-h616-rw)

<h2 align="center">How work it</h2>

When you press the hamburger button, the console run, then the transpiler provide you, a interfaz like a terminal emulator, like a real IDE.

![Emulate runtime in a console](https://lh5.googleusercontent.com/is6PGwDi50Wy25cSWjO6SJ4eItbcc3Mv4MCukiAEVaymJujDWvZPL8HZThiqcl4j7La9lhxS2Pflv3X1kuwl=w1364-h616-rw)

Internally Algorithm transform that code in a equivalent in Javascript

```js
var numero;
var i;
var tabla = new Vector(10);
i = 0 ;
eval(write( "Ingrese numero a multiplicar: " ));
eval(read(" numero "));
while (i < 10) { 
 i = i + 1 ;
tabla.io(i).add("numero") ;
 eval(write( numero, " * ", i, " = ", numero * i ));
}
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars1.githubusercontent.com/u/3018142?s=460&v=4">
        </br>
        <a href="https://github.com/jefer94">@jefer94</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/choco-algorithm.svg
[npm-url]: https://www.npmjs.com/package/choco-algorithm

[node]: https://img.shields.io/node/v/choco-algorithm.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/jefer94/choco-algorithm.svg
[deps-url]: https://david-dm.org/jefer94/choco-algorithm

[chat]: https://badges.gitter.im/jefer94/algorithm.svg
[chat-url]: https://gitter.im/jefer94/algorithm

[downloads]: https://img.shields.io/npm/dt/choco-algorithm.svg
[downloads-url]: https://npmjs.com/package/choco-algorithm
