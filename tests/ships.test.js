import {ships} from '../src/js/ships'


describe('ships class', ()=>{
    let testships

    beforeEach(()=>{
        testships = new ships(4)
    })

    test('check if the default value', ()=>{
        expect(testships.length).toBe(4)
        expect(testships.hitted).toBe(0)
        expect(testships.sunk).toBe(false)
    })

    test('check if it allows customizing values',()=>{
        const customShip = new ships(3,2,true)
        expect(customShip.hitted).toBe(2)
        expect(customShip.sunk).toBe(true)
    })
    test('check if the hit method works',()=>{
        testships.hit()
        expect(testships.hitted).toBe(1)
        testships.hit()
        expect(testships.hitted).toBe(2)
    })
    test ('check it sinks automatically after all part is hit',()=>{
        testships.hit()
        testships.hit()
        testships.hit()
        testships.hit()
        expect(testships.sunk).toBe(true)
    })
})