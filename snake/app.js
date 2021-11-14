const board = document.querySelector("main");
const snakeScore = document.querySelector("#snake-score")
const map = [];
const amountOfColumns = 19;
const amountOfRows = 17;
const snake = [{position: {x: 5, y: 5}, lastPosition: {x: 5, y: 5}}];
let direction = "up"; //up, down, right, left
let lastDirection = "up";
let wykonany = false;

(() => {
    for(let i = 0; i < amountOfRows; i++) {
        map[i] = [];
        for(let j = 0; j < amountOfColumns; j++) {
            const squareTemplate = document.createElement("div");
            if(i === 0 || i === amountOfRows-1 || j === 0 || j === amountOfColumns-1) {
                squareTemplate.classList.add("border");
            }else {
                squareTemplate.classList.add("kostka");
            }
            map[i][j] = squareTemplate;
            board.appendChild(squareTemplate);
        }
    }
})();

document.addEventListener("keyup", (e) => {
    if(!wykonany) {
        lastDirection = direction;
        if(e.code === "ArrowUp" || e.code === "KeyW") {
            if(lastDirection !== "down" && lastDirection !== "up") {
                direction = "up";
                wykonany = true;
            }   
        }else if(e.code === "ArrowDown" || e.code === "KeyS") {
            if(lastDirection !== "up" && lastDirection !== "down") {
                direction = "down";
                wykonany = true;
            }    
        }else if(e.code === "ArrowLeft" || e.code === "KeyA") {
            if(lastDirection !== "right" && lastDirection !== "left") {
                direction = "left";
                wykonany = true;
            }
        }else if(e.code === "ArrowRight" || e.code === "KeyD") {
            if(lastDirection !== "left" && lastDirection !== "right") {
                direction = "right";
                wykonany = true;
            }   
        }
    }
});

function snakeMove() {
    switch(direction) {
        case "up":
            if(!map[snake[0].position.y-1][snake[0].position.x].classList.contains("border") && !map[snake[0].position.y-1][snake[0].position.x].classList.contains("snake")){
                unGenerateSnake()
                snake[0].position.y--;
                eatApple();
                generateSnake();
            }else if(map[snake[0].position.y-1][snake[0].position.x].classList.contains("border")){
                clearInterval(main);
                console.log("lose");
            }
            break;
        case "down":
            if(!map[snake[0].position.y+1][snake[0].position.x].classList.contains("border") && !map[snake[0].position.y+1][snake[0].position.x].classList.contains("snake")){
                unGenerateSnake()
                snake[0].position.y++;
                eatApple();
                generateSnake();
            }else if(map[snake[0].position.y+1][snake[0].position.x].classList.contains("border")){
                clearInterval(main);
                console.log("lose")
            }
            break;
        case "left":
            if(!map[snake[0].position.y][snake[0].position.x-1].classList.contains("border") && !map[snake[0].position.y][snake[0].position.x-1].classList.contains("snake")){
                unGenerateSnake()
                snake[0].position.x--;
                eatApple();
                generateSnake();
            }else if(map[snake[0].position.y][snake[0].position.x-1].classList.contains("border")){
                clearInterval(main);
                console.log("lose")
            }
            break;
        case "right":
            if(!map[snake[0].position.y][snake[0].position.x+1].classList.contains("border") && !map[snake[0].position.y][snake[0].position.x+1].classList.contains("snake")){
                unGenerateSnake()
                snake[0].position.x++;
                eatApple();
                generateSnake();;
            }else{
                clearInterval(main);
                console.log("lose")
            }
            break;
    }
}

function saveLastMoves() {
    for(let i = 0; i < snake.length; i++) {
        snake[i].lastPosition.y = snake[i].position.y;
        snake[i].lastPosition.x = snake[i].position.x;
    }
}

function tailMove() {
    for(let i = 1; i < snake.length; i++) {
        snake[i].position.y = snake[i-1].lastPosition.y;
        snake[i].position.x = snake[i-1].lastPosition.x;
    }
}

function unGenerateSnake() {
    for(let i = 0; i < snake.length; i++) {
        if(!map[snake[i].position.y][snake[i].position.x].classList.contains("apple")) {
            map[snake[i].position.y][snake[i].position.x].classList.add("kostka");
        }
        map[snake[i].position.y][snake[i].position.x].classList.remove("snake");
    }
}

function generateSnake() {
    tailMove();
    for(let i = 0; i < snake.length; i++) {
        map[snake[i].position.y][snake[i].position.x].classList.remove("kostka");
        map[snake[i].position.y][snake[i].position.x].classList.add("snake");
    }
}

function appendSnake() {
    snake.push({position: {x: snake[snake.length-1].lastPosition.x, y: snake[snake.length-1].lastPosition.y}, lastPosition: {x: snake[snake.length-1].lastPosition.x, y: snake[snake.length-1].lastPosition.y}});
}

function eatApple() {
    if(map[snake[0].position.y][snake[0].position.x].classList.contains("apple")) {
        appendSnake();
        snakeScore.innerHTML = snake.length;
        map[snake[0].position.y][snake[0].position.x].classList.remove("apple");
        generateApple();
    }
}

function generateApple() {
    return new Promise((resolve) => {
        let randomRow = Math.floor(Math.random()*(amountOfRows-2)+1);
        let randomCol = Math.floor(Math.random()*(amountOfColumns-2)+1);
        while(map[randomRow][randomCol].classList.contains("snake")) {
            randomRow = Math.floor(Math.random()*(amountOfRows-2)+1);
            randomCol = Math.floor(Math.random()*(amountOfColumns-2)+1);
        }
        map[randomRow][randomCol].classList.remove("kostka");
        map[randomRow][randomCol].classList.add("apple");
        resolve();
    });
}

const main = setInterval(() => {
    saveLastMoves();
    snakeMove();
    wykonany = false;
}, 500);

generateApple();