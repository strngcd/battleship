class GameBoard {
    constructor(){
        this.shipsCoordinate = []
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
}

export default GameBoard