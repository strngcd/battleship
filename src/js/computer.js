import { GameBoard } from "./game-board"
class Computer {
    constructor(){
        this.previousTargets = []
        this.gameBoard = new GameBoard()
    }

    attack(){
        let target = this.pickTarget()
        let verified = this.checkTarget(target)
        this.previousTargets.push(verified)
        return verified
        
    }
    pickTarget(){
        let x = Math.floor( Math.random()*10)
        let y = Math.floor( Math.random()*10)
        let coord = [x,y]
        return coord
    }

    checkTarget(target){
        for (let i=0; i< this.previousTargets.length; i++){
            if (JSON.stringify(target) === JSON.stringify(this.previousTargets[i])){
                target = this.pickTarget()
                return this.checkTarget(target)             
            }
        }
        return target
    }

    checkPrevious(){
        return this.previousTargets
    }

    pickTargetWithShipSize(n){
        let x = Math.floor( Math.random()*n)
        let y = Math.floor( Math.random()*n)
        let coord = [x,y]
        return coord
    }

    standby(){
        
        for (let i=1; i<5; i++){
            let name = 'ship'+i
            let shipSize = i>=2 ? i:2
            let target = this.pickTargetWithShipSize((10-shipSize))
            let place = this.gameBoard.setCoord(target,shipSize)
            let check = this.gameBoard.checkShips(place)
            if(check){
                this.gameBoard.placeShips(name,[target,shipSize])
            }else{
                do{
                    target = this.pickTarget()
                    place = this.gameBoard.setCoord(target,i)
                    check = this.gameBoard.checkShips(place)
                }while(!check)
                this.gameBoard.placeShips(name,[target,shipSize])
            }

            
        }
    }
}

export {Computer}