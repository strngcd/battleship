class Computer {
    constructor(){
        this.previousTargets = []
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
}

export {Computer}