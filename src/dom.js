export const displayGrids = () => {
  
  const container = document.getElementById('boards')
  const playerDiv = document.getElementById('player')
  const oppDiv = document.getElementById('opp')
  
  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.classList.add('user')
      cell.id = `player-${i}-${j}`
      playerDiv.appendChild(cell)
    }
    for (let j=0; j<10; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.classList.add('opp')
      cell.id = `opp-${i}-${j}`
      oppDiv.appendChild(cell)
    }
  }
  container.appendChild(playerDiv)
  container.appendChild(oppDiv)
}

export const removeGrids = () => {
  const player = document.getElementById('player')
  const opp = document.getElementById('opp')

  player.replaceChildren()
  opp.replaceChildren()
}

export const updateTurnText = (next) => {
  const div = document.getElementById('turn')
  div.textContent = `${next} turn`
}

export const gameOverDisplay = (player) => {
  const div = document.getElementById('turn')
  div.textContent = `Game Over! ${player} win!`
  showRestart()
}

const showRestart = () => {
  const btn = document.getElementById('restart')
  btn.textContent = 'Play again'
  btn.classList.add('show')
}

export const hideRestart = () => {
  const btn = document.getElementById('restart')
  btn.classList.remove('show')
}