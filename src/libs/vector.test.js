import Vector from './vector'

test('empty vector', () => {
  for (let i = 1; i < 10; i++) {
    const vector = new Vector(i)
    expect(vector.size).toBe(i)
    expect(vector.i).toBe(0)
    expect(vector.array.length).toBe(0)
  }
})

test('empty arg', () => {
  let response = ''
  try {
    new Vector(0)
  }
  catch(e) {
    response = e.message
  }
  expect(response).toBe('ERROR: invalid array argument')
})

test('add and show value', () => {
  const vector = new Vector(10)
  for (let i = 1; i <= 10; i++) {
    vector.add(i, i)
    expect(vector.show(i)).toBe(i)
  }
})

test('add index 0', () => {
  let response
  try {
    const vector = new Vector(1)
    vector.add(0, 0)
  }
  catch(e) {
    response = e.message
  }
  expect(response).toBe('ERROR: array null point')
})

test('vector overflow', () => {
  const vector = new Vector(10)
  let response = ''
  for (let i = 1; i <= 10; i++) {
    vector.add(i, i)
  }
  try {
    vector.add(11, 11)
  }
  catch(e) {
    response = e.message
  }
  expect(response).toBe('ERROR: array overflow')
})

test('vector io toString', () => {
  const vector = new Vector(10)
  for (let i = 1; i < 10; i++) {
    expect(typeof vector.io).toBe('function')
    vector.io(i).add(i)
    expect(vector.io(i).toString()).toBe(i)
  }
})

test('vector io isVector', () => {
  const vector = new Vector(10)
  for (let i = 1; i < 10; i++) {
    expect(typeof vector.io).toBe('function')
    vector.io(i).add(i)
    expect(vector.io(i).isVector()).toBe(true)
  }
})

test('io and show value', () => {
  const vector = new Vector(10)
  for (let i = 1; i <= 10; i++) {
    expect(typeof vector.io).toBe('function')
    vector.io(i).add(i)
    expect(vector.io(i).show()).toBe(i)
  }
})

test('io add index 0', () => {
  let response
  try {
    const vector = new Vector(1)
    vector.io(0).add(0)
  }
  catch(e) {
    response = e.message
  }
  expect(response).toBe('ERROR: array null point')
})

test('io vector overflow', () => {
  const vector = new Vector(10)
  let response = ''
  for (let i = 1; i <= 10; i++) {
    vector.io(i).add(i)
  }
  try {
    vector.io(11).add(11)
  }
  catch(e) {
    response = e.message
  }
  expect(response).toBe('ERROR: array overflow')
})