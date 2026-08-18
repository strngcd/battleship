import GameBoard from "../src/js/game-board";

describe("Game board class", ()=>{
    let testGameBoard

    beforeEach(()=>{
        testGameBoard = new GameBoard()
    })

    test("check if returns undefined for wrong directions",()=>{
        expect(testGameBoard.setCoord([0,0],2,0)).toBe(undefined)
    })

    test("check if it adds side ways in default",()=>{
        expect(testGameBoard.setCoord([3,3],2)).toEqual([[3,3],[4,3],[5,3]])

    })
    
    test("check if it adds in given direction",()=>{
        expect(testGameBoard.setCoord([3,3],2,-6)).toEqual([[3,3],[4,3],[5,3]])
        expect(testGameBoard.setCoord([3,3],2,2)).toEqual([[3,3],[3,4],[3,5]])
    })
})