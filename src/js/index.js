import "../styles/template-style.css"

import { Play } from "./player.js";

const play = new Play()
play.getReady()
play.mockShips()
const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");
let computerAttack
const gameMessage = document.querySelector("#game-message");
const turnDisplay = document.querySelector("#turn");
const shipsRemaining = document.querySelector("#ships-remaining");
shipsRemaining.innerHTML = play.bot.gameBoard.shipsRemain()

const newGameButton = document.querySelector("#new-game");

function newGame(){
    for (let i=0; i<10;i++){
    for (let j=0;j<10;j++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = j;
        cell.dataset.y = i;
        cell.dataset.board = "player";
        playerBoard.appendChild(cell)
    }
}
for (let i=0; i<10;i++){
    for (let j=0;j<10;j++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = j;
        cell.dataset.y = i;
        cell.dataset.board = "computer";
        computerBoard.appendChild(cell)
    }
}
}

newGame()

computerBoard.addEventListener("click", (event) => {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const takeShot = play.bot.gameBoard.takeShot([x,y])
    if (takeShot)
        {cell.classList.add("hit")}else{
            cell.classList.add("miss")
        }
    if (play.bot.gameBoard.isLost()){
        playerBoard.innerHTML = ''
        computerBoard.innerHTML = ''
        newGame()}
    shipsRemaining.innerHTML = play.bot.gameBoard.shipsRemain()
    turnDisplay.innerHTML = "COMPUTER"
    computerAttack = play.bot.attack() 
    playerTakeShoot(computerAttack)

});

function playerTakeShoot(attack){
    const takeShot= play.player.takeShot(attack)
    const [x,y] = attack
    const cell = playerBoard.querySelector(
        `[data-x="${x}"][data-y="${y}"]`);
    if (takeShot)
        {cell.classList.add("hit")}else{
            cell.classList.add("miss")
        }

    if (play.player.isLost()){
        playerBoard.innerHTML = ''
        playerBoard.innerHTML = ''
        newGame()}



}
