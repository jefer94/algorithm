class Vector {
  constructor (n) {
    if (n <= 0 || typeof n != 'number')
      throw 'ERROR: invalid array argument';
    this.size = n;
    this.i = 0;
    this.array = [];
  }
  add (v) {
    if (this.i < this.size && this.size > 0)
      this.array.push(v);
    else
      throw 'ERROR: array overflow';
    this.i++;
  }
  show(n) {
    n--;
    if (n < this.size && n >= 0)
      return this.array[n]
    else
      throw 'ERROR: array null point'
  }
}
