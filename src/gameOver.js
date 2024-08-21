import { displayGrids, hideRestart, removeGrids, updateTurnText } from "./dom";
import { initialPlayers } from "./render";

export const gameOver = () => {
  
  const btn = document.getElementById('restart')
  btn.addEventListener('click', () => {
    removeGrids()
    displayGrids()
    initialPlayers()
    // we need to initialPlayrs without placing dummies but let player choose his own
    hideRestart()
    updateTurnText('Your')
  })
}