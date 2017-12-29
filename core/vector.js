class Vector {
  constructor (n) {
    if (n <= 0 || typeof n !== 'number')
      throw 'ERROR: invalid array argument';
    this.size = n;
    this.i = 0;
    this.array = [];
  }
  add (v, i) {
    i--;
    if (this.i < this.size && this.size > 0) {
      if (this.array[i] != undefined)
        this.i++;
      this.array[i] = v;
    }
    else
      throw 'ERROR: array overflow';
  }
  show (n) {
    n--;
    if (n < this.size && n >= 0)
      return this.array[n];
    else
      throw 'ERROR: array null point';
  }
  io (i) {
    return {
      add: (v) => this.add(v, i),
      show: () => this.show(i),
      toString: () => this.show(i),
      is_vector: () => true
    };
  }
}
