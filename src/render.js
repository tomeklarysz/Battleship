import { gameOverDisplay, updateTurnText } from './dom'
import { placeDummies } from './dummies'
import { gameOver } from './gameOver'

const player = require('./player')

const createPlayers = () => {
  const user = player()
  const opp = player()
  user.type = 'player'
  opp.type = 'computer'
  return { user, opp }
}


const renderCell = (players, i, j) => {
  const userBoard = players.user.gameboard.board
  const oppBoard = players.opp.gameboard.board

  // user board
  let val = userBoard[i][j]
  if (val === 'O') {
    document.getElementById(`player-${i}-${j}`).classList.add('ship')
  } else if (val === 'X') {
    document.getElementById(`player-${i}-${j}`).classList.add('shot')
    document.getElementById(`player-${i}-${j}`).textContent = 'X'
  } else if (val === 'M') {
    document.getElementById(`player-${i}-${j}`).classList.add('missed')
  } else if (val === 'S') {
    document.getElementById(`player-${i}-${j}`).classList.add('sunk')
    sunk(players, players.user, i, j)
  }
  
  // opponent board
  val = oppBoard[i][j]
  if (val === 'X') {
    document.getElementById(`opp-${i}-${j}`).classList.add('shot')
    document.getElementById(`opp-${i}-${j}`).textContent = 'X'
  } else if (val === 'M') {
    document.getElementById(`opp-${i}-${j}`).classList.add('missed')
  } else if (val === 'S') {
    document.getElementById(`opp-${i}-${j}`).classList.add('sunk')
    sunk(players, players.opp, i, j)
  }
}

const initialBoardRender = (players) => {

  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      renderCell(players, i, j)
    }
  }
}


const readCords = (cell) => {
  const row = cell.id.split('-')[1]
  const col = cell.id.split('-')[2]
  return [Number(row), Number(col)]
}



const isUsersTurn = (players) => {
  const userTurns = players.user.missedShots
  const oppTurns = players.opp.missedShots

  return userTurns === oppTurns
}


const userTurn = (players) => {
  const children = document.getElementById('opp').children

  for (let i=0; i<children.length; i++) {
    children[i].addEventListener('click', () => {
      const cords = readCords(children[i])
      try {
        if (isUsersTurn(players)) {
          const isHit = players.opp.gameboard.receiveAttack(players.opp.gameboard.ships, cords[0], cords[1])
          if (!isHit) {
            players.opp.missedShots++
            updateTurnText('Computer\'s')
          }
          renderCell(players, cords[0], cords[1])
        }
      } catch (error) {
        console.error(error)
        alert('You\'ve already hit that cell!')
      }
    })
  }
}

const oppTurn = (players) => {
  setInterval(() => {
    if (!isUsersTurn(players)) {
      randomAttack(players)
    }
  }, 3000);
}

const randomAttack = (players) => {
  const index = Math.floor(Math.random() * 100)
  const randomCell = players.opp.possibleAttacks[index]
  const row = randomCell[0]
  const col = randomCell[1]
  const isHit = players.user.gameboard.receiveAttack(players.user.gameboard.ships, row, col)
  if (!isHit) {
    players.user.missedShots++
    updateTurnText('Your')
  }
  players.opp.possibleAttacks.splice(index, 1)
  renderCell(players, row, col)
}

const sunk = (players, player, row, col) => {
  
  let ships = player.gameboard.ships.filter(element => element.isSunk())
  
  // determine on which board is sunk ship
  let type
  if (player.type === 'computer') type = 'opp'
  else type = 'player'

  // when every ship is sunk game over
  if (ships.length === player.gameboard.ships.length) {
    let name
    if (type === 'opp') name = 'You'
    else name = 'Computer'
    gameOverDisplay(name)
    gameOver()
  }

  document.getElementById(`${type}-${row}-${col}`).classList.add('sunk')
  for (const ship of ships) {
    for (const cell of ship.placements) {
      if (cell[0] === row && cell[1] === col) {
        ship.placements.forEach(element => {
          document.getElementById(`${type}-${element[0]}-${element[1]}`).classList.remove('shot')
          document.getElementById(`${type}-${element[0]}-${element[1]}`).classList.add('sunk')
          document.getElementById(`${type}-${element[0]}-${element[1]}`).textContent = 'S'
          player.gameboard.board[element[0]][element[1]] = 'S'
        })
        ships = ships.filter(cur => cur != ship)
        return
      }
    }
  }
}

export const initialPlayers = () => {
  const players = createPlayers()
  placeDummies(players)
  initialBoardRender(players)
  userTurn(players)
  oppTurn(players)
}