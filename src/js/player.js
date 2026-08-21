import { GameBoard } from "./game-board.js";
import { Computer } from "./computer.js";
class Play {
    constructor(){
        this.player = new GameBoard()
        this.bot = new Computer()
    }
    getReady(){
        this.bot.standby()
    }
    
}
export {Play}