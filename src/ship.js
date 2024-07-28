const createShip = (length) => {
  return {
    length,
    hits: 0,
    sunk: false,
    placements: [],
    hit() {
      if (this.hits + 1 === length) this.sunk = true
      return this.hits++
    },
    isSunk() {
      return this.hits === this.length
    }
  }
}

module.exports = createShip;