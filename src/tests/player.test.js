const player = require('../player')

test('player setup test', () => {
  const example = player()
  expect(example.type).toBe(undefined)
  expect(example.gameboard.board.length).toBe(10)
  
  example.type = 'player'
  expect(example.type).toBe('player')

  example.gameboard.placeShip(3, [0, 0], [0, 2])
  expect(example.gameboard.board[0][1]).toEqual('O')
  
  example.gameboard.receiveAttack(0, 1)
  expect(example.gameboard.board[0][1]).toEqual('X')
})