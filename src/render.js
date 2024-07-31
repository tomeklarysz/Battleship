const player = require('./player')

const createPlayers = () => {
  const user = player()
  const opp = player()
  user.type = 'player'
  opp.type = 'computer'
  return { user, opp }
}

// predetermined cords
const placeDummies = (players) => {
  players.user.gameboard.placeShip(4, [2, 3], [5, 3])
  players.user.gameboard.placeShip(3, [1, 6], [3, 6])
  players.user.gameboard.placeShip(3, [7, 7], [7, 9])
  players.user.gameboard.placeShip(2, [1, 1], [2, 1])
  players.user.gameboard.placeShip(2, [5, 1], [6, 1])
  players.user.gameboard.placeShip(2, [4, 8], [5, 8])
  players.user.gameboard.placeShip(1, [8, 2], [8, 2])
  players.user.gameboard.placeShip(1, [9, 4], [9, 4])
  players.user.gameboard.placeShip(1, [9, 6], [9, 6])
  players.user.gameboard.placeShip(1, [5, 6], [5, 6])

  players.opp.gameboard.placeShip(4, [2, 3], [5, 3])
  players.opp.gameboard.placeShip(3, [1, 6], [3, 6])
  players.opp.gameboard.placeShip(3, [7, 7], [7, 9])
  players.opp.gameboard.placeShip(2, [1, 1], [2, 1])
  players.opp.gameboard.placeShip(2, [5, 1], [6, 1])
  players.opp.gameboard.placeShip(2, [4, 8], [5, 8])
  players.opp.gameboard.placeShip(1, [8, 2], [8, 2])
  players.opp.gameboard.placeShip(1, [9, 4], [9, 4])
  players.opp.gameboard.placeShip(1, [9, 6], [9, 6])
  players.opp.gameboard.placeShip(1, [5, 6], [5, 6])

}

const renderBoards = (players) => {
  const userBoard = players.user.gameboard.board
  const oppBoard = players.opp.gameboard.board

  const ships = players.opp.gameboard.ships
  // console.log('opp ships: ', ships);
  // console.log('user ships: ', players.user.gameboard.ships);
  
  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
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
        sunk(players.user, i, j)
      }
      // opponent board
      val = oppBoard[i][j]
      if (val === 'X') {
        document.getElementById(`opp-${i}-${j}`).classList.add('shot')
        document.getElementById(`opp-${i}-${j}`).textContent = 'X'
      } else if (val === 'M') {
        document.getElementById(`opp-${i}-${j}`).classList.add('missed')
      } else if (val === 'S') {
        document.getElementById(`opp-${i}-${j}`).textContent = 'S'
        sunk(players.opp, i, j)
      }
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
        const isHit = players.opp.gameboard.receiveAttack(players.opp.gameboard.ships, cords[0], cords[1])
        if (!isHit) players.opp.missedShots++
      } catch (error) {
        console.error(error)
      }
      renderBoards(players)
    })
  }
}

const oppTurn = (players) => {
  setInterval(() => {
    if (!isUsersTurn(players)) {
      const index = Math.floor(Math.random() * 100)
      const randomCell = players.opp.possibleAttacks[index]
      const row = randomCell[0]
      const col = randomCell[1]
      const isHit = players.user.gameboard.receiveAttack(players.user.gameboard.ships, row, col)
      if (!isHit) players.user.missedShots++
      players.opp.possibleAttacks.splice(index, 1)
      renderBoards(players)
    }
  }, 2000);
}

const sunk = (player, row, col) => {
  let ships = player.gameboard.ships.filter(element => element.isSunk())
  document.getElementById(`opp-${row}-${col}`).classList.add('sunk')
  for (const ship of ships) {
    for (const cell of ship.placements) {
      if (cell[0] === row && cell[1] === col) {
        console.log(ship.placements);
        ship.placements.forEach(element => {
          document.getElementById(`opp-${element[0]}-${element[1]}`).classList.remove('shot')
          document.getElementById(`opp-${element[0]}-${element[1]}`).classList.add('sunk')
          document.getElementById(`opp-${element[0]}-${element[1]}`).textContent = 'S'
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
  renderBoards(players)
  userTurn(players)
  oppTurn(players)
  console.log(players.opp.gameboard.ships);
}