const board = document.querySelector("main");
const root = document.documentElement;
const whoWin = document.querySelector("#who-win");
const kostkiArray = [];
let color = "red";
let stop = false;

(() => {
    for(let i = 0; i < 7; i++) {
        let kolumnaTemplate = document.createElement("div");
        kolumnaTemplate.classList.add("column");
        kolumnaTemplate.id = "column" + i;
        kolumnaTemplate.addEventListener("click", addCircle);
        kolumnaTemplate.addEventListener("mouseover", showWhere);
        kolumnaTemplate.addEventListener("mouseout", unShowWhere);
        kostkiArray[i] = {kolumna: kolumnaTemplate, kostki: [], freeSpace: 5};
        board.appendChild(kostkiArray[i].kolumna);
        for(let j = 0; j < 6; j++) {
            let kostkaTemplate = document.createElement("div");
            kostkaTemplate.classList.add("kostka");
            kostkiArray[i].kostki.push(kostkaTemplate);
            kostkiArray[i].kolumna.appendChild(kostkaTemplate);
        }
    }
})();

function orATie() {
    let suma = 0;
    for(let i = 0; i < 7; i++) {
        suma += kostkiArray[i].freeSpace;
    }
    return suma;
}

function addCircle() {
    if(!stop) {
        let id = this.id.replace("column", "");
        let freeSpace = kostkiArray[id].freeSpace;
        if(freeSpace > -1) {
            kostkiArray[id].kostki[freeSpace].style.background = color;
            if(color === "red") {
                color = "yellow";
            }else {
                color = "red";
            }
            root.style.setProperty("--color-of-circle", color);
            kostkiArray[id].freeSpace--;
            refeere(+id, +freeSpace);
        }
    }
}

function refeere(kolumna, wiersz) {
    let czy4 = false;
    let circleColor = kostkiArray[kolumna].kostki[wiersz]?.style.background;
    let ile = 1;
    
    function win() {
        if(ile === 4) {
            czy4 = true;
            stop = true;
            whoWin.innerHTML += `<span style="color: ${circleColor}">${circleColor}</span>`;
            whoWin.style.visibility = "visible";
        }else if(orATie() === -7){
            stop = true;
            whoWin.innerHTML = "Draw";
            whoWin.style.visibility = "visible";
        }else {
            ile = 1;
        }
    }

        //pion
    for(let i = kolumna-1; i > kolumna-4; i--) {
        if(kostkiArray[i]?.kostki[wiersz]?.style.background === circleColor) {
            ile++;
        }else {
            break;
        }
    }
    for(let i = kolumna+1; i < kolumna+4; i++) {
        if(kostkiArray[i]?.kostki[wiersz]?.style.background === circleColor) {
            ile++;
        }else {
            break;
        }
    }
    win();
        //poziom 
        if(!czy4) {
            for(let i = wiersz-1; i > wiersz-4; i--) {
                if(kostkiArray[kolumna]?.kostki[i]?.style.background === circleColor) {
                    ile++;
                }else {
                    break;
                }
            }

            for(let i = wiersz+1; i < wiersz+4; i++) {
                if(kostkiArray[kolumna]?.kostki[i]?.style.background === circleColor) {
                    ile++;
                }else {
                    break;
                }
            }
            win();
            if(!czy4) {
                //skos dół
                for(let i = kolumna-1, j = wiersz-1; i > kolumna-4 && j > wiersz-4; i--, j--) {
                    if(kostkiArray[i]?.kostki[j]?.style.background === circleColor) {
                        ile++;
                    }else {
                        break;
                    }
                }
                for(let i = kolumna+1, j = wiersz+1; i < kolumna+4 && j < wiersz+4; i++, j++) {
                    if(kostkiArray[i]?.kostki[j]?.style.background === circleColor) {
                        ile++;
                    }else {
                        break;
                    }
                }
                win();
                if(!czy4) {
                    //skos góra
                    for(let i = kolumna-1, j = wiersz+1; i > kolumna-4 && j < wiersz+4; i--, j++) {
                        if(kostkiArray[i]?.kostki[j]?.style.background === circleColor) {
                            ile++;
                        }else {
                            break;
                        }
                    }
                    for(let i = kolumna+1, j = wiersz-1; i < kolumna+4 && j > wiersz-4; i++, j--) {
                        if(kostkiArray[i]?.kostki[j]?.style.background === circleColor) {
                            ile++;
                        }else {
                            break;
                        }
                    }
                    win();
                }
            }
        }
}

function showWhere() {
    this.classList.add("selected");
}

function unShowWhere() {
    this.classList.remove("selected");
}