import { displayGrids, hideRestart, removeGrids, removeRestart, updateTurnText } from "./dom";
import { initialPlayers } from "./render";

// const player = require('./player')

export const gameOver = () => {
  
  const btn = document.getElementById('restart')
  btn.addEventListener('click', () => {
    removeGrids()
    displayGrids()
    initialPlayers()
    hideRestart()
    updateTurnText('Your')
  })
}