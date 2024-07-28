const createShip = (length) => {
  return {
    length,
    hits: 0,
    sunk: false,
    hit() {
      return this.hits++
    },
    isSunk() {
      return this.hits === this.length
    }
  }
}

module.exports = createShip;