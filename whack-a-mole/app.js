const timeValue = document.querySelector("#time-value");
const kostki = document.querySelectorAll(".kostka");
const hitValue = document.querySelector("#hit-value");
const amountValue = document.querySelector("#amount-value");
const timeOfGame = 60;
let index = 0;
let amountOfMole = 0;

function getRandomCell() {
    return Math.floor(Math.random()*kostki.length);
}

function everySecond() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        kostki[index].classList.remove("mole");
        timeValue.innerHTML--;
        index = getRandomCell();
        kostki[index].classList.add("mole");
        amountOfMole++;
        amountValue.innerHTML = amountOfMole;
        resolve();
        }, 1000);
    });
}

kostki.forEach((e) => {
    e.addEventListener("click", () => {
        if(e.classList.contains("mole")) {
            e.classList.remove("mole");
            hitValue.innerHTML++;
        }
    });
});

(async () => {
    for(let i = 0; i < timeOfGame; i++) {
        await everySecond();
    }
})();