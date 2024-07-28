const createShip = require('../ship')

describe('create ship tests', () => {
  
  test('initial setup: length, hit, sunk', () => {
    expect(createShip(5).length).toBe(5)
    expect(createShip(5).hits).toEqual(0)
    expect(createShip(5).sunk).toBeFalsy()
  })
  test('getting hit and sunking', () => {
    const ship = createShip(3)
    expect(ship.hits).toEqual(0)
    ship.hit()
    expect(ship.hits).toEqual(1)
    ship.hit()
    ship.hit()
    expect(ship.hits).toEqual(3)
    expect(ship.isSunk()).toBeTruthy()
  })

})