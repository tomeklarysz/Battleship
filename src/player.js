const gameboard = require('./gameboard')

const createArray = (size) => {
  let arr = []
  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      arr.push([i, j])
    }
  }
  return arr
} 

const player = () => {
  return {
    type: undefined,
    missedShots: 0,
    possibleAttacks: createArray(10),
    gameboard: gameboard()
  }
}

module.exports = player