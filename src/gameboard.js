const createShip = require('./ship')

const gameboard = () => {
  
  let board = create2DArray(10)
  let ships = []
  const placeShip = (size, start, end) => {
    // check if we don't go outside the board
    if (!start.every(value => value >= 0 && value < 10) || !end.every(value => value >= 0 && value < 10)) {
      throw new Error('wrong coordinates')
    }
    
    const ship = createShip(size)
    ships.push(ship)
    let horizontal = false
    let vertical = false
    
    // if horizontal
    if (start[0] === end[0]) {

      // check if end is closer to the left than start
      // if so, we swap them
      if (end[1] < start[1]) {
        const temp = start[1]
        start[1] = end[1]
        end[1] = temp
      }


      // check if size of a ship is valid
      if (end[1] - start[1] + 1 !== size) {
        throw new Error('wrong coordinates')
      }

      horizontal = true

    // if vertical
    } else if (start[1] === end[1]) {
      
      // check if end is lower than start
      // if so, we swap them
      if (end[0] < start[0]) {
        const temp = start[0]
        start[0] = end[0]
        end[0] = temp 
      }
      
      // check if size of a ship is valid
      if (end[0] - start[0] + 1 !== size) {
        throw new Error('wrong coordinates')
      }
      vertical = true

      // if not horizontal or vertical
    } else throw new Error('wrong coordinates')
    
    
    // ship placement on the board
    if (horizontal) {
      for (let i=0; i<size; i++) {
        board[start[0]][start[1] + i] = 'O'
        ship.placements.push([start[0], start[1]+i])
      }
    }
    if (vertical) {
      const col = start[1]
      let i=0
      while (i < size) {
        board[start[0] + i][col] = 'O'
        ship.placements.push([start[0] + i, col])
        i++
      }
    }
    return ship
  }

  const receiveAttack = (row, col) => {
    
    // check if we don't go outside the board
    if (!(row >= 0 && row < 10) || !(col >= 0 && col < 10)) {
      throw new Error('wrong coordinates')
    }

    // check if it's not already hit place
    if (board[row][col] === 'X') {
      throw new Error('you already hit this place')
    }

    // when hit ship
    if (board[row][col] === 'O') {
      board[row][col] = 'X'
      for (let ship of ships) {
        for (let place of ship.placements) {
          if (place[0] === row && place[1] === col) {
            ship.hit()
            if (ship.isSunk()) {
              ships = ships.filter(cur => cur != ship)  // remove ship from list of ships
              isGameOver()
            }
            return
          }
        }
      }
    // when missed shot
    } else {
        board[row][col] = 'M'
        return
    }
  }

  const isGameOver = () => {
    if (ships.length === 0) {
      // whipe board
      board.fill(new Array(10))
      console.log('game over!')
      return true
    }
    return false
  }

  return { board, placeShip, receiveAttack, isGameOver }
}


const create2DArray = (size) => {
  const array = new Array(size)
  for (let i=0; i<size; i++) {
    array[i] = new Array(size)
  }
  return array
}

module.exports = gameboard;