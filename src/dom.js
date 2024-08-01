export const displayGrids = () => {
  
  const container = document.getElementById('boards')
  const playerDiv = document.getElementById('player')
  const oppDiv = document.getElementById('opp')
  
  for (let i=0; i<10; i++) {
    for (let j=0; j<10; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
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

export const updateTurnText = (next) => {
  const div = document.getElementById('turn')
  div.textContent = `${next} turn`
}

export const gameOverDisplay = (player) => {
  const div = document.getElementById('turn')
  div.textContent = `Game Over! ${player} win!`
  createRestart()
}

const createRestart = () => {
  const container = document.getElementById('container')
  
  const btn = document.createElement('button')
  btn.id = 'restart'
  btn.textContent = 'Play again'
  container.insertBefore(btn, container.firstChild)
}

export const removeRestart = () => {
  const btn = document.getElementById('restart')
  document.getElementById('container').removeChild(btn)
}