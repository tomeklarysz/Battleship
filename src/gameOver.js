import { displayGrids, hideRestart, removeGrids, updateTurnText } from "./dom";
import { initialPlayers } from "./render";

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