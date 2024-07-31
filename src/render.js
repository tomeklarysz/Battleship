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

export const renderBoards = (userBoard, oppBoard) => {
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
      }
      // opponent board
      val = oppBoard[i][j]
      if (val === 'X') {
        document.getElementById(`opp-${i}-${j}`).classList.add('shot')
        document.getElementById(`opp-${i}-${j}`).textContent = 'X'
      } else if (val === 'M') {
        document.getElementById(`opp-${i}-${j}`).classList.add('missed')
      }
    }
  }
}

const readCords = (cell) => {
  const row = cell.id.split('-')[1]
  const col = cell.id.split('-')[2]
  console.log(row, col);
  return [row, col]
}


const listener = (players) => {
  const oppDiv = document.getElementById('opp')
  const oppCells = [...oppDiv.children]
  
  oppCells.forEach(item => {
    item.addEventListener('click', () => {
      const cords = readCords(item)
      players.opp.gameboard.receiveAttack(cords[0], cords[1])
      renderBoards(players.user.gameboard.board, players.opp.gameboard.board)
    })
  })
}


export const initialPlayers = () => {
  const players = createPlayers()
  placeDummies(players)
  renderBoards(players.user.gameboard.board, players.opp.gameboard.board)
  listener(players)
}