class Vector {
  constructor(n) {
    if (n <= 0 || typeof n !== 'number') throw new Error('ERROR: invalid array argument')
    this.size = n
    this.i = 0
    this.array = []
  }

  add(v, i) {
    const index = i - 1
    if (index === -1) throw new Error('ERROR: array null point')
    if (index < this.size && this.size > 0) {
      if (this.array[index] !== undefined) this.i++
      this.array[index] = v
    }
    else throw new Error('ERROR: array overflow')
  }

  show(n) {
    const start = n - 1
    if (start < this.size && start >= 0) return this.array[start]
    throw new Error('ERROR: array null point')
  }

  io(i) {
    return {
      add: (v) => this.add(v, i),
      show: () => this.show(i),
      toString: () => this.show(i),
      isVector: () => true
    }
  }
}

export default Vector
