import { initialBoardRender, renderCell, readCords } from "./render"
import { removeGrids, displayGrids } from "./dom"
const create2DArray = require('./gameboard')

const chooseShipsHandler = (players) => {
  
  // clear user board
  players.user.gameboard.board = create2DArray(10)
  console.log('clicked')
  removeGrids()
  displayGrids()

  document.querySelectorAll('.user').forEach(cell => {
    cell.style.cursor = 'pointer'
  })

  let ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]
  let forbiddenCells = players.user.gameboard.forbiddenCells
  
  document.addEventListener('click', (e) => {
    pickOnlyFirstCell(e, ships)    
  })
      
  // initialBoardRender(players)
}

const pickOnlyFirstCell = (e, ships) => {
  if (e.target.matches('.user')) {
    const cords = readCords(e.target)
    e.target.classList.add('potential')
    e.target.textContent = 1
    document.removeEventListener('click', pickOnlyFirstCell)
    calculatePotential(ships)
  }
}

const calculatePotential = (ships) => {
  const potential = document.querySelector('.potential')
  const num = ships.pop()
  console.log(num)
  const cords = readCords(potential)
  const row = cords[0]
  const col = cords[1]
  showHoverInfo(row, col, num)
}

const showHoverInfo = (row, col, num) => {

  if (num === 1) {
    //...
    return
  }

  document.addEventListener('mouseover', e => {
    if (e.target.matches('.toBeShip')) {
      e.target.style.backgroundColor = 'lightgray'
      e.target.style.color = 'black'
    }
  })
  console.log(row, col)
  // left
  if (col - num + 1 >= 0) {
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row}-${col - i}`)
      addCellStyle(current, i, num)
    }
  }
  // right
  if (col + num - 1 < 10) {
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row}-${col + i}`)
      addCellStyle(current, i, num)
    }
  }
  // top
  if (row - num + 1 >= 0) {
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row - i}-${col}`)
      addCellStyle(current, i, num)
    }
  }
  // bottom
  if (row + num - 1 < 10) {
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row + i}-${col}`)
      addCellStyle(current, i, num)
    }
  }
}

const addCellStyle = (current, index, num) => {
  current.classList.add('toBeShip')
  current.textContent = `${index+1}`
  if (index == num - 1) {
    current.classList.add('last')
  }
}

export const randomShips = (players) => {
}

export const chooseShips = (players) => {
  const btn = document.getElementById('change')
  btn.addEventListener('click', () => {
    chooseShipsHandler(players)
  })
}