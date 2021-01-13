console.log(`Lancement écran de veille.`)

window.onload = function chargement() {
    console.log(`Le DOM est chargé.`);


    let carre = document.querySelector('#carre');
    let container = document.querySelector('#container');

    //carre.style.borderRadius = "50px";
    //carre.style.background = "blue";


    let x = 0;
    let y = 0;
    let CYCLE = 1;
    carre.style.left = x;
    carre.style.bottom = y;
    document.querySelector('#x').value = x;
    document.querySelector('#y').value = y;
    document.querySelector(`#range`).value = CYCLE;
    document.getElementById(`rangeValue`).innerHTML = `Temps du cycle : ${CYCLE}ms`;
    const MIN = 0;
    const MAX = container.clientWidth;
    let move = true;
    const TAILLE_CARRE = carre.clientWidth;
    let direction = { 'x': 1, 'y': 1 };
    let coefX = 1;
    let coefY = 1;
    let startMove = true;

    //Fonction run

    function run() {
        changeDirection();

        if (direction.x == -1) {
            x += direction.x * coefX;
            changePositionX(x);
        } else {
            x += direction.x * coefX;
            changePositionX(x);
        }

        if (direction.y == -1) {
            y += direction.y * coefY;
            changePositionY(y);
        } else {
            y += direction.y * coefY;
            changePositionY(y);
        }
        if (move == true) {
            document.querySelector('#x').value = x;
            document.querySelector('#y').value = y;
            highLightBorder();
            setTimeout(run, CYCLE);
        }
        //console.log(`x = ${x}, y = ${y}.`);
        //console.log(direction);       
    }

    //Fonction changePositionX

    let changePositionX = (x) => {
        carre.style.left = x;
    }

    //Fonction changePositionY

    let changePositionY = (y) => {
        carre.style.bottom = y;
    }

    //Fonction changeDirection

    function changeDirection() {
        if (x >= MAX - TAILLE_CARRE) {
            direction.x = -1;
            coefX = randomCoef();
        } else if (x <= MIN) {
            direction.x = 1;
            coefX = randomCoef();
        }
        if (y >= MAX - TAILLE_CARRE) {
            direction.y = -1;
            coefY = randomCoef();
        } else if (y <= MIN) {
            direction.y = 1;
            coefY = randomCoef();
        }

    }

    //Fonction coef random

    function randomCoef(min = 1, max = 5) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Fonction highLightBorder

    function highLightBorder() {
        if (x >= MAX - TAILLE_CARRE) {
            container.style.borderRight = "solid 3px white";
            setTimeout(function () { container.style.borderRight = "solid 1px black"; }, 50)
        } else if (x <= MIN) {
            container.style.borderLeft = "solid 3px white";
            setTimeout(function () { container.style.borderLeft = "solid 1px black"; }, 50)
        } else {

        }
        if (y >= MAX - TAILLE_CARRE) {
            container.style.borderTop = "solid 3px white";
            setTimeout(function () { container.style.borderTop = "solid 1px black"; }, 50)
        } else if (y <= MIN) {
            container.style.borderBottom = "solid 3px white";
            setTimeout(function () { container.style.borderBottom = "solid 1px black"; }, 50)
        }
    }

    // Fonction rangeValue

    document.getElementById(`range`).addEventListener(`change`, function () {
        rangeValue();
    });

    function rangeValue() {
        let z = document.querySelector(`#range`);
        CYCLE = z.value;
        document.getElementById(`rangeValue`).innerHTML = `Temps du cycle : ${CYCLE}ms`;
    }

    //Détection du changement des valeurs dans les inputs x et y modifiées par l'utilisateur

    document.querySelector('#x').addEventListener('change', function () {
        if (startMove == true) {
            carre.style.left = document.querySelector('#x').value;
        }
    })
    document.querySelector('#y').addEventListener('change', function () {
        if (startMove == true) {
            carre.style.bottom = document.querySelector('#y').value;
        }
    })


    //Appel des fonctions avec bouton Go, Stop et Relancer


    //GO
    document.getElementById(`go`).addEventListener(`click`, function () {
        if (startMove == true) {
            x = Number(document.querySelector('#x').value);
            y = Number(document.querySelector('#y').value);
            //CYCLE = Number(document.querySelector(`#range`).value);
            startMove = false;
            move = true;
            run();
        } else {
            console.error(`Erreur - Impossible de relancer.`);
        }
    });

    //STOP
    document.getElementById(`stop`).addEventListener(`click`, function () {
        move = false;
        startMove = true;
    });

    //RELANCER
    document.getElementById(`relance`).addEventListener(`click`, function () {
        move = false;
        startMove = true;
        x = 0;
        y = 0;
        document.querySelector('#x').value = x;
        document.querySelector('#y').value = y;
        carre.style.left = x;
        carre.style.bottom = y;
        // CYCLE = 1;
        document.querySelector(`#range`).value = CYCLE;
        document.getElementById(`rangeValue`).innerHTML = `Temps du cycle : ${CYCLE}ms`;

    });


}
