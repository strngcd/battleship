import { ships } from "./ships"
class GameBoard {
    constructor(){
        this.ships = []
        this.missed = []
    }
    setCoord(coord,shipSize,direction=-1){
        let place = []
        if (direction ===0){
            return  undefined
        }else if (direction<0){
            place.push(coord)
            for (let i=1; i< shipSize; i++){
               let hold = [...coord]
               hold[0]= hold[0]+i 
               place.push(hold)
            }
        }else{
            place.push(coord)
            for (let i=1; i<shipSize;i++){
               let hold = [...coord]
               hold[1]= hold[1]+i 
               place.push(hold)
            }

        }
        return place
    }

    placeShips(shipName, shipCoord){
        if (!this.checkShips(shipCoord[0])) return false
        let place
        let aShip = {}
        if (shipCoord.length === 2){
         place = this.setCoord(shipCoord[0],shipCoord[1])
        }else{ place = this.setCoord(shipCoord[0],shipCoord[1],shipCoord[2])}
        aShip.name = shipName
        aShip.coord = place
        aShip.status = new ships(shipCoord[1])
        this.ships.push(aShip)
        return true
    }
    tempShow(){
        return this.ships
    }

    takeShot(coord){
        for (let i=0; i< this.ships.length;i++){
            if (!this.ships[i].status.is()){
                let current = this.ships[i].coord
                for (let j=0; j< current.length; j++){
                    if (JSON.stringify(coord) === JSON.stringify(current[j])){
                        this.ships[i].status.hit()
                        if (this.ships[i].status.is()){this.sinkShip(i)}
                        return true
                    }
                }
            }
        }
        this.missed.push(coord)
        return false
    }

    sinkShip(index){
        this.ships.splice(index,1)
    }

    playerLost(){
        if (this.ships.length === 0){
            return true
        }else{ return this.ships.length}
    }
    checkShips(coord){
        if (this.ships.length === 0){return true}
        for (let i=0; i<this.ships.length;i++){
            let current = this.ships[i].coord
            let similarity = current.some(currentItem=>
                    JSON.stringify(currentItem) === JSON.stringify(coord)
                )

            if (similarity){return false}
        }
        return true
    }
    
}



export { GameBoard}