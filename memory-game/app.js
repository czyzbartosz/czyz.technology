const board = document.querySelector("main");
const scoreValue = document.querySelector("#score-value");
const cardsArray = [
    {
        id: 1,
        url: "./images/cheeseburger.png"
    },
    {
        id: 1,
        url: "./images/cheeseburger.png"
    },
    {
        id: 2,
        url: "./images/fries.png"
    },
    {
        id: 2,
        url: "./images/fries.png"
    },
    {
        id: 3,
        url: "./images/hotdog.png"
    },
    {
        id: 3,
        url: "./images/hotdog.png"
    },
    {
        id: 4,
        url: "./images/ice-cream.png"
    },
    {
        id: 4,
        url: "./images/ice-cream.png"
    },
    {
        id: 5,
        url: "./images/milkshake.png"
    },
    {
        id: 5,
        url: "./images/milkshake.png"
    },
    {
        id: 6,
        url: "./images/pizza.png"
    },
    {
        id: 6,
        url: "./images/pizza.png"
    },
];
let lastIndexOfCard = -1;
let previousElement;
let lastElement;
let score = 0;

const arrayLenght = cardsArray.length;

function randomPosition(currentPosition) {
    return Math.floor(Math.random()*currentPosition);
}

function mixCards(array) {
    sizeOfArray = array.length - 1;
    for(let i = sizeOfArray; i >= 0; i--) {
        let temp = array[i];
        let randomIndex = randomPosition(i);
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

function generateBoard(arrayLenght) {
    let elementsString = "";
    for(let i = 0; i < arrayLenght; i++) {
        elementsString += `<div class='card' id='card${i}' onclick='referee(this)'></div>`
    }
    board.innerHTML = elementsString;
}

function referee(element) {
    if(lastElement) {
        unReverseCard(lastElement, previousElement);
        lastElement = null;
        previousElement = null;
    }
    let currentCardId = +element.id.replace("card", "");
    if(lastIndexOfCard === -1) {
        lastIndexOfCard = currentCardId;
        previousElement = element;
        reverseCard(element);
    }else if(cardsArray[lastIndexOfCard].id === cardsArray[currentCardId].id && lastIndexOfCard !== currentCardId) {
        score++;
        scoreValue.innerHTML = "Score: " + score;
        if(score === arrayLenght/2) {
            if(confirm("Wygrałeś!!! \n Kliknij 'OK', aby zagrać jeszcze raz!")) {
                location.reload();
            }
        }
        element.onclick = null;
        previousElement.onclick = null;
        lastIndexOfCard = -1;
        previousElement = null;
        reverseCard(element);
    }else if(lastIndexOfCard === currentCardId){

    }else {
        reverseCard(element);
        lastIndexOfCard = -1;
        lastElement = element;
    }
}

function reverseCard(element) {
    let id = +element.id.replace("card", "");
    element.style.background = "url(" + cardsArray[id].url + ")";
}

function unReverseCard(element1, element2) {
    element1.style.background = "url(./images/blank.png)";
    element2.style.background = "url(./images/blank.png)";
}

mixCards(cardsArray);
generateBoard(arrayLenght);