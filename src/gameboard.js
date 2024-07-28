const gameboard = () => {
  
  let board = create2DArray(10)
  const placeShip = (size, start, end) => {
    
    // check if we don't go outside the board
    if (!start.every(value => value >= 0 && value < 10) || !end.every(value => value >= 0 && value < 10)) {
      throw new Error('wrong coordinates')
    }
    
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
      board[start[0]].fill('O', start[1], end[1] + 1)
    }
    if (vertical) {
      const col = start[1]
      let i=0
      while (i < size) {
        board[start[0] + i][col] = 'O'
        i++
      }
    }
  }
  return { board, placeShip }
}


const create2DArray = (size) => {
  const array = new Array(size)
  for (let i=0; i<size; i++) {
    array[i] = new Array(size)
  }
  return array
}

module.exports = gameboard;