import { displayGrids, hideStart, removeGrids, updateTurnText } from "./dom";
import { initialBoardRender, initialPlayers, newGame } from "./render";

export const gameOver = (players) => {
  
  const btn = document.getElementById('start')
  btn.textContent = 'Play again'
  btn.addEventListener('click', gameOverListener)
  
  function gameOverListener() {
    removeGrids()
    displayGrids()
    players = newGame(players)
    console.log(players)
    // initialBoardRender(players)
    // initialPlayers()
    // we need to initialPlayrs without placing dummies but let player choose his own
    updateTurnText('Your')
    btn.removeEventListener('click', gameOverListener)
  }
}