
import { experiments } from "webpack";
import { Computer } from "../src/js/computer";

describe("Computer target test",()=>{

    let testComputer

    beforeEach(()=>{
        testComputer = new Computer()
    })

    test("Check if it generates a target",()=>{
       expect(testComputer.attack()).toEqual(expect.any(Array))
    })

    test("Check if it stores previous targets",()=>{
        let target = testComputer.attack()
        expect(testComputer.checkPrevious()[0]).toEqual(target)
    })

    test("Check does not pick same target twice",()=>{
        const firsttaget = testComputer.attack()
        const secondtarget = testComputer.attack()
        expect(firsttaget).not.toEqual(secondtarget)
    })

    test('Check if it places ships right',()=>{
        testComputer.gameBoard.placeShips('titanic', [[3,3],1])
        testComputer.gameBoard.takeShot([3,3])
        expect(testComputer.gameBoard.tempShow().length).toBe(0)
    })

    test("Check if it is standby",()=>{
        testComputer.standby()
        expect(testComputer.gameBoard.tempShow().length).toBe(4)
    })
})