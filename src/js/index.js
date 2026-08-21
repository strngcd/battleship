import "../styles/template-style.css";
import { Play } from "./player.js";

const SHIPS = [
    { name: "ship-1", label: "PATROL", size: 2 },
    { name: "ship-2", label: "DESTROYER", size: 2 },
    { name: "ship-3", label: "CRUISER", size: 3 },
    { name: "ship-4", label: "BATTLESHIP", size: 4 },
];

let play;
let selectedShip = null;
let direction = -1; // -1 = X axis, 1 = Y axis
let gameStarted = false;
let gameOver = false;

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");
const gameMessage = document.querySelector("#game-message");
const turnDisplay = document.querySelector("#turn");
const shipsRemaining = document.querySelector("#ships-remaining");
const shipList = document.querySelector("#ship-list");
const orientationButton = document.querySelector("#orientation");
const startGameButton = document.querySelector("#start-game");
const placementControls = document.querySelector("#placement-controls");
const newGameButton = document.querySelector("#new-game");

function createBoard(boardElement, boardName) {
    boardElement.innerHTML = "";

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.dataset.board = boardName;
            boardElement.appendChild(cell);
        }
    }
}

function getCell(board, x, y) {
    return board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}

function getCoordsFromCell(cell) {
    return [Number(cell.dataset.x), Number(cell.dataset.y)];
}

function getShipCells(ship) {
    return ship.coord.map(([x, y]) => getCell(playerBoard, x, y));
}

function renderPlayerShips() {
    playerBoard.querySelectorAll(".ship").forEach(cell => {
        cell.classList.remove("ship");
    });

    for (const ship of play.player.ships) {
        for (const cell of getShipCells(ship)) {
            if (cell) cell.classList.add("ship");
        }
    }
}

function renderComputerShips() {
    for (const ship of play.bot.gameBoard.ships) {
        for (const [x, y] of ship.coord) {
            const cell = getCell(computerBoard, x, y);
            if (cell) cell.classList.add("ship");
        }
    }
}

function createShipButtons() {
    shipList.innerHTML = "";

    for (const ship of SHIPS) {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("ship-button");
        button.dataset.ship = ship.name;
        button.textContent = `${ship.label} (${ship.size})`;
        button.addEventListener("click", () => selectShip(ship.name));
        shipList.appendChild(button);
    }
}

function selectShip(shipName) {
    if (gameStarted) return;

    selectedShip = SHIPS.find(ship => ship.name === shipName);

    document.querySelectorAll(".ship-button").forEach(button => {
        button.classList.toggle("selected", button.dataset.ship === shipName);
    });

    gameMessage.textContent =
        `Place ${selectedShip.label} (${selectedShip.size} cells) on the ${direction < 0 ? "X" : "Y"} axis.`;
}

function isPlaced(shipName) {
    return play.player.ships.some(ship => ship.name === shipName);
}

function getPlacement(coord) {
    if (!selectedShip) return null;

    const place = play.player.setCoord(
        coord,
        selectedShip.size,
        direction
    );

    // Keep placement inside the 10 x 10 board.
    const inBounds = place.every(([x, y]) =>
        x >= 0 && x < 10 && y >= 0 && y < 10
    );

    if (!inBounds || !play.player.checkShips(place)) {
        return null;
    }

    return place;
}

function clearPreview() {
    playerBoard.querySelectorAll(".preview, .invalid").forEach(cell => {
        cell.classList.remove("preview", "invalid");
    });
}

function previewPlacement(cell) {
    clearPreview();

    if (gameStarted || !selectedShip || isPlaced(selectedShip.name)) return;

    const place = getPlacement(getCoordsFromCell(cell));
    const coords = place || play.player.setCoord(
        getCoordsFromCell(cell),
        selectedShip.size,
        direction
    );

    for (const [x, y] of coords) {
        const previewCell = getCell(playerBoard, x, y);

        if (previewCell) {
            previewCell.classList.add(place ? "preview" : "invalid");
        }
    }
}

function placeSelectedShip(cell) {
    if (gameStarted || !selectedShip || isPlaced(selectedShip.name)) return;

    const coord = getCoordsFromCell(cell);
    const place = getPlacement(coord);

    if (!place) {
        gameMessage.textContent = "That ship cannot be placed there.";
        return;
    }

    play.player.placeShips(
        selectedShip.name,
        [coord, selectedShip.size, direction]
    );

    renderPlayerShips();
    cell.blur();

    document.querySelector(`[data-ship="${selectedShip.name}"]`)
        .classList.add("placed");

    selectedShip = null;
    document.querySelectorAll(".ship-button").forEach(button => {
        button.classList.remove("selected");
    });

    const allPlaced = play.player.ships.length === SHIPS.length;
    startGameButton.disabled = !allPlaced;

    gameMessage.textContent = allPlaced
        ? "All ships placed. Start the game."
        : "Select another ship to place.";

    clearPreview();
}

function startGame() {
    if (play.player.ships.length !== SHIPS.length) return;

    gameStarted = true;
    placementControls.classList.add("hidden");
    turnDisplay.textContent = "PLAYER";
    gameMessage.textContent = "Your turn. Fire at the computer board.";
}

function updateShipsRemaining() {
    shipsRemaining.textContent = play.player.shipsRemain();
}

function playerAttack(cell) {
    if (!gameStarted || gameOver || turnDisplay.textContent !== "PLAYER") return;
    if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

    const coord = getCoordsFromCell(cell);
    const hit = play.bot.gameBoard.takeShot(coord);

    cell.classList.add(hit ? "hit" : "miss");

    if (play.bot.gameBoard.isLost()) {
        gameOver = true;
        renderComputerShips();
        turnDisplay.textContent = "WIN";
        gameMessage.textContent = "You destroyed the computer fleet.";
        return;
    }

    turnDisplay.textContent = "COMPUTER";
    gameMessage.textContent = hit
        ? "Hit. The computer is attacking..."
        : "Miss. The computer is attacking...";

    window.setTimeout(computerAttack, 250);
}

function computerAttack() {
    if (gameOver) return;

    const attack = play.bot.attack();
    const hit = play.player.takeShot(attack);
    const [x, y] = attack;
    const cell = getCell(playerBoard, x, y);

    cell.classList.add(hit ? "hit" : "miss");

    updateShipsRemaining();

    if (play.player.isLost()) {
        gameOver = true;
        turnDisplay.textContent = "LOSE";
        gameMessage.textContent = "The computer destroyed your fleet.";
        return;
    }

    turnDisplay.textContent = "PLAYER";
    gameMessage.textContent = hit
        ? "Your ship was hit. Fire back."
        : "The computer missed. Your turn.";
}

function resetGame() {
    play = new Play();
    play.getReady();

    selectedShip = null;
    direction = -1;
    gameStarted = false;
    gameOver = false;

    createBoard(playerBoard, "player");
    createBoard(computerBoard, "computer");
    createShipButtons();

    placementControls.classList.remove("hidden");
    orientationButton.textContent = "AXIS: X";
    startGameButton.disabled = true;
    turnDisplay.textContent = "PLACEMENT";
    shipsRemaining.textContent = play.player.shipsRemain();
    gameMessage.textContent = "Select a ship, then click a cell to place it.";
}

orientationButton.addEventListener("click", () => {
    if (gameStarted) return;

    direction *= -1;
    orientationButton.textContent = `AXIS: ${direction < 0 ? "X" : "Y"}`;

    if (selectedShip) {
        gameMessage.textContent =
            `Place ${selectedShip.label} (${selectedShip.size} cells) on the ${direction < 0 ? "X" : "Y"} axis.`;
    }
});

playerBoard.addEventListener("mouseover", event => {
    if (event.target.classList.contains("cell")) {
        previewPlacement(event.target);
    }
});

playerBoard.addEventListener("mouseleave", clearPreview);

playerBoard.addEventListener("click", event => {
    if (event.target.classList.contains("cell")) {
        placeSelectedShip(event.target);
    }
});

computerBoard.addEventListener("click", event => {
    if (event.target.classList.contains("cell")) {
        playerAttack(event.target);
    }
});

startGameButton.addEventListener("click", startGame);
newGameButton.addEventListener("click", resetGame);

resetGame();