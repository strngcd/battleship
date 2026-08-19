import { experiments } from "webpack"
import { GameBoard } from "../src/js/game-board"

describe("Game board class", ()=>{
    let testGameBoard

    beforeEach(()=>{
        testGameBoard = new GameBoard()
    })

    test("check if returns undefined for wrong directions",()=>{
        expect(testGameBoard.setCoord([0,0],2,0)).toBe(undefined)
    })

    test("check if it adds side ways in default",()=>{
        expect(testGameBoard.setCoord([3,3],2)).toEqual([[3,3],[4,3]])

    })
    
    test("check if it adds in given direction",()=>{
        expect(testGameBoard.setCoord([3,3],2,-6)).toEqual([[3,3],[4,3]])
        expect(testGameBoard.setCoord([3,3],2,2)).toEqual([[3,3],[3,4]])
    })

    test("Check if the data is being stored right",()=>{
        testGameBoard.placeShips('titanic',[[3,3],2])
        expect(testGameBoard.tempShow()[0].name).toBe('titanic')
        expect(testGameBoard.tempShow()[0].coord).toEqual([[3,3],[4,3]])
        expect(testGameBoard.tempShow()[0].status.is()).toBe(false)
    })

    test("Check if it counts hit shots correctly", ()=>{
        testGameBoard.placeShips('titanic',[[3,3],2])
        expect(testGameBoard.takeShot([4,3])).toBe(true)
    })

    test("check if it count misses",()=>{
        testGameBoard.placeShips('titanic',[[3,3],2])
        expect(testGameBoard.takeShot([0,0])).toBe(false)
    })

    test("check if it sinks a ship",()=>{
        testGameBoard.placeShips('titanic',[[3,3],1])
        testGameBoard.takeShot([3,3])
        expect(testGameBoard.tempShow().length).toBe(0)
    })

    test("Check if it tells how many ships are left", ()=>{
        testGameBoard.placeShips('titanic',[[3,3],2])
        testGameBoard.takeShot([3,3])
        expect(testGameBoard.playerLost()).toBe(1)
        testGameBoard.takeShot([4,3])
        expect(testGameBoard.playerLost()).toBe(true)
    })

    test("Check if checks for overlap",()=>{
        testGameBoard.placeShips("titanic",[[3,3],3])
<<<<<<< HEAD
        expect(testGameBoard.checkShips([4,3])).toBe(false)
        expect(testGameBoard.checkShips([6,3])).toBe(true)
        expect(testGameBoard.checkShips([2,3])).toBe(true)
=======
        expect(testGameBoard.checkShips([[4,3]])).toBe(false)
        expect(testGameBoard.checkShips([[6,3]])).toBe(true)
        expect(testGameBoard.checkShips([[2,3]])).toBe(true)
>>>>>>> player
    })

    test("Check if it doesn't place ship on top of another",()=>{
        testGameBoard.placeShips("titanic",[[3,3],2])
        expect(testGameBoard.placeShips("titanic",[[4,3],4])).toBe(false)
        expect(testGameBoard.placeShips("titanic",[[6,3],3])).toBe(true)
        expect(testGameBoard.placeShips("titanic",[[2,3],9])).toBe(true)
<<<<<<< HEAD
=======
        expect(testGameBoard.placeShips("titanic", [[2,3],2])).toBe(false)
>>>>>>> player
    })
})