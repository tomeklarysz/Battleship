const createShip = require('./ship')

const gameboard = () => {
  
  let board = create2DArray(10)
  let ships = []
  let forbiddenCells = []
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
    
    
    const isCellValid = (cell) => {
      return !forbiddenCells.includes(cell)
    }

    // ship placement on the board
    if (horizontal) {
      for (let i=0; i<size; i++) {
        if (!isCellValid([start[0], start[1] + i])) {
          alert('wrong coordinates')
          throw new Error('wrong coordinates')
        }
        board[start[0]][start[1] + i] = 'O'
        ship.placements.push([start[0], start[1] + i])
        forbiddenCells.push([start[0], start[1] + i])
        
        // add cells above and below to forbidden cells
        if (start[0] - 1 >= 0) forbiddenCells.push([start[0] - 1, start[1] + i])
        if (start[0] + 1 < 10) forbiddenCells.push([start[0] + 1, start[1] + i])
      }

      // add cells that are beside and diagonal to the first and last one to forbidden
      
      // left one
      if (start[1] - 1 >= 0) {
        forbiddenCells.push([start[0], start[1] - 1])
        if (start[0] - 1 >= 0) forbiddenCells.push([start[0] - 1, start[1] - 1])
        if (start[0] + 1 < 10) forbiddenCells.push([start[0] + 1, start[1] - 1])
      }

      // right one
      if (end[1] + 1 < 10) {
        forbiddenCells.push([end[0], end[1] + 1])
        if (end[0] - 1 >= 0) forbiddenCells.push([end[0] - 1, end[1] + 1])
        if (end[0] + 1 < 10) forbiddenCells.push([end[0] + 1, end[1] + 1])
      }
    }

    if (vertical) {
      const col = start[1]
      let i=0
      while (i < size) {
        if (!isCellValid([start[0] + i, col])) {
          alert('wrong coordinates')
          throw new Error('wrong coordinates')
        }
        board[start[0] + i][col] = 'O'
        ship.placements.push([start[0] + i, col])
        forbiddenCells.push([start[0] + i, col])

        // add cells to forbidden cells that are next to current cell
        if (col - 1 >= 0) forbiddenCells.push([start[0] + i, col - 1])
        if (col + 1 < 10) forbiddenCells.push([start[0] + i, col + 1])

        i++
      }

      // add cells to forbidden that are above and diagonal to the top cell
      if (start[0] - 1 >= 0) {
        forbiddenCells.push([start[0] - 1, col])
        if (col - 1 >= 0) forbiddenCells.push([start[0] - 1, col - 1])
        if (col + 1 < 10) forbiddenCells.push([start[0] - 1, col + 1])
      }

      // add cells to forbidden that are below and diagonal to the bottom cell
      if (end[0] + 1 < 10) {
        forbiddenCells.push([end[0] + 1, col])
        if (col - 1 >= 0) forbiddenCells.push([end[0] + 1, col - 1])
        if (col + 1 < 10) forbiddenCells.push([end[0] + 1, col + 1])
      }
    }
    removeDuplicates(forbiddenCells)
    return ship
  }

  const removeDuplicates = (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (JSON.stringify(array[i]) === JSON.stringify(array[j])) {
          array.splice(j, 1);
          j--;
        }
      }
    }
  }

  const receiveAttack = (ships, row, col) => {
    
    // check if we don't go outside the board
    if (!(row >= 0 && row < 10) || !(col >= 0 && col < 10)) {
      throw new Error('wrong coordinates')
    }

    // check if it's not already hit place
    if (board[row][col] === 'X' || board[row][col] === 'M' 
      || board[row][col] === 'S') {
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
              board[row][col] = 'S'
            }
            return true
          }
        }
      }
    // when missed shot
    } else {
        board[row][col] = 'M'
        return false
    }
  }

  return { board, placeShip, receiveAttack, ships, forbiddenCells }
}


const create2DArray = (size) => {
  const array = new Array(size)
  for (let i=0; i<size; i++) {
    array[i] = new Array(size)
  }
  return array
}

module.exports = gameboard;