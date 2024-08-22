import { initialBoardRender, renderCell, readCords } from "./render"
import { removeGrids, displayGrids } from "./dom"
const gameboard = require('./gameboard')

let ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4]
const chooseShipsHandler = (players) => {
  
  // clear user board
  players.user.gameboard = gameboard()
  console.log('clicked')
  removeGrids()
  displayGrids()

  document.querySelectorAll('.user').forEach(cell => {
    cell.classList.toggle('point')
  })

  
  document.addEventListener('click', pickOnlyFirstCell)
  document.addEventListener('click', (e) => {
    pickLastCell(e, players)
  })
}

const pickOnlyFirstCell = (e) => {
  if (e.target.matches('.user')) {
    if (!e.target.matches('.forbidden') &&
       !e.target.matches('.ship')) {
      e.target.classList.add('potential')
      e.target.textContent = 1
      document.removeEventListener('click', pickOnlyFirstCell)
      document.querySelectorAll('.user').forEach(cell => {
        if (!cell.classList.contains('forbidden')) {
          cell.classList.toggle('point')
        }
      })
      calculatePotential(ships)
      // if (ships.length == 0) {
        // alert('no ships left')
      // }
    }
  }
}

const calculatePotential = (ships) => {
  const potential = document.querySelector('.potential')
  const num = ships.slice(-1).pop()
  const cords = readCords(potential)
  const row = cords[0]
  const col = cords[1]
  showHoverInfo(row, col, num)
}

const showHoverInfo = (row, col, num) => {

  if (num === 1) {
    const current = document.getElementById(`player-${row}-${col}`)
    addCellStyle(current, 0, num)
    // return
  }

  document.addEventListener('mouseover', e => {
    if (e.target.matches('.toBeShip')) {
      e.target.classList.add('show')
      e.target.style.color = 'black'
    }
  })


  // check if not forbidden or ship function
  const canBeShip = cell => {
    return !(cell.classList.contains('forbidden') ||
    cell.classList.contains('ship'))
  }

  // left
  if (col - num + 1 >= 0) {
    let valid = true
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row}-${col - i}`)
      if (!canBeShip(current)) {
        valid = false
        break
      }
    }
    if (valid) {
      for (let i=1; i<num; i++) {
        const current = document.getElementById(`player-${row}-${col - i}`)
        addCellStyle(current, i, num)
      }
    }
  }
  // right
  if (col + num - 1 < 10) {
    let valid = true
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row}-${col + i}`)
      if (!canBeShip(current)) {
        valid = false
        break
      }
    }
    if (valid) {
      for (let i=1; i<num; i++) {
        const current = document.getElementById(`player-${row}-${col + i}`)
        if (!canBeShip(current)) break
        addCellStyle(current, i, num)
      }
    }
  }
  // top
  if (row - num + 1 >= 0) {
    let valid = true
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row - i}-${col}`)
      if (!canBeShip(current)) {
        valid = false
        break
      }
    }
    if (valid) {
      for (let i=1; i<num; i++) {
        const current = document.getElementById(`player-${row - i}-${col}`)
        if (!canBeShip(current)) break
        addCellStyle(current, i, num)
      }
    }
  }
  // bottom
  if (row + num - 1 < 10) {
    let valid = true
    for (let i=1; i<num; i++) {
      const current = document.getElementById(`player-${row + i}-${col}`)
      if (!canBeShip(current)) {
        valid = false
        break
      }
    }
    if (valid) {
      for (let i=1; i<num; i++) {
        const current = document.getElementById(`player-${row + i}-${col}`)
        if (!canBeShip(current)) break
        addCellStyle(current, i, num)
      }
    }
  }
}

const addCellStyle = (current, index, num) => {
  current.classList.add('toBeShip')
  current.textContent = `${index+1}`
  if (index == num - 1) {
    current.classList.add('last')
    current.classList.toggle('point')
  }
}

const pickLastCell = (e, players) => {
  if (e.target.matches('.last')) {
    const size = ships.pop()
    const firstCords = readCords(document.querySelector('.potential'))
    const lastCords = readCords(e.target)
    console.log(players)
    players.user.gameboard.placeShip(size, firstCords, lastCords)
    removeCellStyle()
    initialBoardRender(players)
    addForbiddenStyle(players)
    console.log(ships.length)
    if (ships.length === 0) {
      alert('all ships chosen!')
    } else {
      document.addEventListener('click', pickOnlyFirstCell)
      document.querySelectorAll('.user').forEach(cell => {
        if (!cell.classList.contains('ship') &&
          !cell.classList.contains('forbidden')) {
          cell.classList.toggle('point')
        }
      })
    }
  }
}

const removeCellStyle = () => {
  document.querySelectorAll('.toBeShip').forEach(item => {
    item.textContent = ''
    if (item.classList.contains('last')) {
      item.classList.remove('last')
    }
    if (item.classList.contains('show')) {
      item.classList.remove('show')
    }
    item.classList.remove('toBeShip')
    item.classList.remove('point')
  })
  document.querySelector('.potential').textContent = ''
  document.querySelector('.potential').classList.remove('potential')
}

const addForbiddenStyle = (players) => {
  const forbiddenCells = players.user.gameboard.forbiddenCells
  forbiddenCells.forEach(item => {
    const row = item[0]
    const col = item[1]
    const current = document.getElementById(`player-${row}-${col}`)
    if (!(current.classList.contains('ship'))) {
      current.classList.add('forbidden')
    }
  })
}

export const randomShips = (players) => {
}

export const chooseShips = (players) => {
  const btn = document.getElementById('change')
  btn.addEventListener('click', () => {
    chooseShipsHandler(players)
  })
}