const gameboard = require('../gameboard')

describe('gameboard tests', () => {

  test('initial gameboard setup', () => {
    expect(gameboard().board.length).toEqual(10)
    expect(gameboard().board[5].length).toEqual(10)
  })

  test('ship placement when valid cords', () => {
    const example = gameboard()
    example.placeShip(3, [0, 0], [0, 2])
    expect(example.board[0][0]).toEqual('O')
    expect(example.board[0][1]).toEqual('O')
    expect(example.board[0][2]).toEqual('O')

    example.placeShip(4, [3, 4], [6, 4])
    expect(example.board[3][4]).toEqual('O')
    expect(example.board[4][4]).toEqual('O')
    expect(example.board[5][4]).toEqual('O')
    expect(example.board[6][4]).toEqual('O')
    
    example.placeShip(3, [1, 2], [1, 0])
    expect(example.board[1][0]).toEqual('O')
    expect(example.board[1][1]).toEqual('O')
    expect(example.board[1][2]).toEqual('O')

    example.placeShip(3, [2, 2], [0, 2])
    expect(example.board[1][0]).toEqual('O')
    expect(example.board[1][1]).toEqual('O')
    expect(example.board[1][2]).toEqual('O')
    
    example.placeShip(1, [9, 9], [9, 9])
    expect(example.board[9][9]).toEqual('O')

    console.log(example.board);
  })

  test('ship placement when unvalid cords', () => {
    const example = gameboard()
    expect(() => example.placeShip(1, [9, 9], [9, 8])).toThrow()
    expect(() => example.placeShip(5, [0, 0], [0, 5])).toThrow()
    expect(() => example.placeShip(3, [0, 0], [2, 2])).toThrow()
  })
})