// predetermined cords
export const placeDummiesOpp = (players) => {
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

export const placeDummiesUser = (players) => {
  console.log('placing dummies on user')
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
}