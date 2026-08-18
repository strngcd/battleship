class ships {
    constructor (length,hitted=0,sunk= false ){
        this.length = length
        this.hitted = hitted
        this.sunk = sunk
    }
    hit(){
        this.hitted++
        if (this.hitted >= this.length){
            this.sink()
        }
    }
    sink(){
        this.sunk = true
    }
}

export default ships