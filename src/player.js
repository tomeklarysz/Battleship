const gameboard = require('./gameboard')

const player = () => {
  return {
    type: undefined,
    gameboard: gameboard()
  }
}

module.exports = player