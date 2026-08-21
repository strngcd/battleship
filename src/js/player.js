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
    mockShips(){
        this.player.placeShips('ship-1',[[3,3],4])
        this.player.placeShips('ship-2',[[0,0],3,3])
        this.player.placeShips('ship-3',[[7,7],2])
        this.player.placeShips('ship-1',[[5,4],2,3])

    }
}
export {Play}