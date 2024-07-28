const gameboard = require('../gameboard')

describe('gameboard tests', () => {

  test('initial gameboard setup', () => {
    expect(gameboard().board.length).toEqual(10)
    expect(gameboard().board[5].length).toEqual(10)
  })

  test('ship placement when valid cords', () => {
    const example = gameboard()
    const ship1 = example.placeShip(3, [0, 0], [0, 2])
    expect(example.board[0][0]).toEqual('O')
    expect(example.board[0][1]).toEqual('O')
    expect(example.board[0][2]).toEqual('O')
    expect(ship1.placements.length).toEqual(3)

    const ship2 = example.placeShip(4, [3, 4], [6, 4])
    expect(example.board[3][4]).toEqual('O')
    expect(example.board[4][4]).toEqual('O')
    expect(example.board[5][4]).toEqual('O')
    expect(example.board[6][4]).toEqual('O')
    expect(ship2.placements.length).toEqual(4)
    
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
  })

  test('ship placement when unvalid cords', () => {
    const example = gameboard()
    expect(() => example.placeShip(1, [9, 9], [9, 8])).toThrow()
    expect(() => example.placeShip(5, [0, 0], [0, 5])).toThrow()
    expect(() => example.placeShip(3, [0, 0], [2, 2])).toThrow()
  })

  test.only('receiving attacks', () => {
    const example = gameboard()
    const ship1 = example.placeShip(3, [2, 2], [0, 2])
    const ship2 = example.placeShip(4, [3, 4], [6, 4])
    
    // attacks when ships are hit
    example.receiveAttack(1, 2)
    expect(ship1.hits).toEqual(1)
    example.receiveAttack(2, 2)
    example.receiveAttack(0, 2)
    expect(ship1.hits).toEqual(3)
    expect(ship1.isSunk()).toBeTruthy()
    expect(ship1.sunk).toBeTruthy()
    
    // when cords are outside the board
    expect(() => example.receiveAttack(10, 2)).toThrow()
    expect(() => example.receiveAttack(0, 20)).toThrow()
    
    // when place has been already hit
    expect(() => example.receiveAttack(0, 2)).toThrow()
    expect(() => example.receiveAttack(1, 2)).toThrow()

    // when missed attack
    example.receiveAttack(3, 2)
    expect(example.board[3][2]).toEqual('M')
  })
})