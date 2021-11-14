const board = document.querySelector("main");
const boardArray = [];
const invaders = [];
const invadersPosition = [];
const rows = 15;
const columns = 15;
const heightInvaders = 3;
const widthInvaders = 10;
const amountOfInvaders = 30;
let moveInterval;
let points = 0;

//set a amount of columns to a main
board.style.gridTemplateColumns = `repeat(${columns}, 30px)`;

//generate a board
for(let y = 0; y < rows; y++) {
    boardArray.push([]);
    invadersPosition.push([]);
    for(let x = 0; x < columns; x++) {
        const box = document.createElement("div");
        box.classList.add("box");
        boardArray[y].push(box);
        board.appendChild(box);
    }
}

class Invader {
    direction = "right";
    isLive = true;
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.currentX = x;
        this.currentY = y;
        this.index = index;
    }
    generate() {
        invadersPosition[this.currentY][this.currentX] = this.index;
    }
    remove() {
        invadersPosition[this.currentY][this.currentX] = null;
    }
    move() {
        if(this.currentX < (columns + this.x - widthInvaders) && this.direction === "right") {
            this.currentX++;
        }else if(this.currentX > (this.x)){
            if(this.direction === "right") {
                this.direction = "left";
                this.currentY++;
            }else {
                this.currentX--;
            }
        }else {
            this.direction = "right";
            this.currentY++;
        }
    }
    destructor() {
        this.isLive = false;
        this.remove();
    }
}

let spaceship = {
    position: {
        x: (columns - 1) / 2,
        y: rows - 2
    },
    lastPosition: {
        x: (columns - 1) / 2,
        y: rows - 2
    }
};

function keysEvent(e) {
    switch(e.code) {
        case "KeyA": 
        case "ArrowLeft":
            if(spaceship.position.x > 0) {
                saveLastPositionOfSpaceship()
                spaceship.position.x--;
                renderSpaceship();
            }    
            break;
        case "KeyD":
        case "ArrowRight":
            if(spaceship.position.x < columns-1) {
                saveLastPositionOfSpaceship()
                spaceship.position.x++;
                renderSpaceship();
            }    
            break;
        case "KeyW":
        case "ArrowUp":
            shot();
            break;
    }
}

document.addEventListener("keyup", keysEvent);

function shot() {
    let x = spaceship.position.x;
    let y = spaceship.position.y - 1;
    boardArray[y][x].classList.add("ammo");

    function moveShot() {
        boardArray[y][x].classList.remove("ammo");
        y--;
        boardArray[y][x].classList.add("ammo");
        
        if(invadersPosition[y][x] >= 0 && invadersPosition[y][x] !== null){
            clearInterval(moves);
            boardArray[y][x].classList.remove("invader");
            invaders[invadersPosition[y][x]].destructor();
            setTimeout(() => {
                boardArray[y][x].classList.remove("ammo");
            }, 100);
            points++;
            isWin();
        }else if(y === 0) {
            clearInterval(moves);
            setTimeout(() => {
                boardArray[y][x].classList.remove("ammo");
            }, 100);
        }
    }

    let moves = setInterval(moveShot, 50);
}

function saveLastPositionOfSpaceship() {
    spaceship.lastPosition.x = spaceship.position.x;
    spaceship.lastPosition.y = spaceship.position.y;
}

function renderSpaceship() {
    boardArray[spaceship.lastPosition.y][spaceship.lastPosition.x].classList.remove("spaceship");
    boardArray[spaceship.position.y][spaceship.position.x].classList.add("spaceship");
}

function generateInvader() {
    let i = 0;
    for(let y = 0; y < heightInvaders; y++) {
        for(let x = 0; x < widthInvaders; x++, i++) {
            invaders[i] = new Invader(x, y, i);
        }
    }
    addInvader();
}

function removeInvader() {
    invaders.forEach((e) => {
        boardArray[e.currentY][e.currentX].classList.remove("invader");
        e.remove();
    });
    
}

function addInvader() {
    for(let e of invaders) {
        if(e.isLive) {
            boardArray[e.currentY][e.currentX].classList.add("invader");
            e.generate();
            if(e.currentY === spaceship.position.y) {
                stopMoveInterval();
                console.log("lose");
                alert("lose☹");
                break;
            }
        }
    }
}

function stopMoveInterval() {
    clearInterval(moveInterval);
    document.removeEventListener("keyup", keysEvent);
}

function isWin() {
    if(points === widthInvaders * heightInvaders) {
        console.log("win");
        stopMoveInterval();
        alert("win!");
    }
}

function start() {
    renderSpaceship();
    generateInvader();
    moveInterval = setInterval(() => {
        removeInvader();
        invaders.forEach((e) => {
            e.move();
        });
        addInvader();
    }, 1000)
}

start();