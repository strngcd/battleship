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
            for (let i=1; i< shipSize +1; i++){
               let hold = [...coord]
               hold[0]= hold[0]+i 
               place.push(hold)
            }
        }else{
            place.push(coord)
            for (let i=1; i<shipSize+1;i++){
               let hold = [...coord]
               hold[1]= hold[1]+i 
               place.push(hold)
            }

        }
        return place
    }

    placeShips(shipName, shipCoord){
        let place
        let aShip = {}
        if (shipCoord.length === 2){
         place = this.setCoord(shipCoord[0],shipCoord[1])
        }else{ place = this.setCoord(shipCoord[0],shipCoord[1],shipCoord[2])}
        aShip.name = shipName
        aShip.coord = place
        this.ships.push(aShip)
    }
    tempShow(){
        return this.ships
    }
}



export { GameBoard}