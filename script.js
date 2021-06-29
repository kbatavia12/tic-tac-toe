let chance = 1;
let players = ['O', 'X'];
var turns = 1;
var markSpace = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
var winner = "";

var scoreX = 0;
var scoreO = 0;
const xScore = document.getElementById('x-score');       
const oScore = document.getElementById('o-score');
const winnerElement = document.getElementById('winner')


function threeEquals(a, b, c) {
    return (a === b && b === c && a != "");
}


function checkRow(space) {
    for (let i = 0; i < 3; ++i) {
        if (threeEquals(space[i][0], space[i][1], space[i][2])) {
            return space[i][0];
        }
    }

    return "";

}

function checkColumn(space) {
    for (let i = 0; i < 3; ++i) {
        if (threeEquals(space[0][i], space[1][i], space[2][i])) {
            return space[0][i];
        }
    }

    return "";
}

function checkDiagonal(space) {
    if (threeEquals(space[0][0], space[2][2], space[1][1])) {
        return space[0][0];
    }

    if (threeEquals(space[0][2], space[1][1], space[2][0])) {
        return space[1][1];
    }

    return "";

}


function setGridBlank(grid) {
    setTimeout(() => {
        grid.forEach(function (element) {
            element.innerHTML = "";
        });
        markSpace = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        winnerElement.innerHTML = "";
    }, 1000)
}


function incrementScore(winner) {
    if(winner == "X") {
        xScore.innerHTML = `X: ${++scoreX}`;
        winnerElement.style = "color: red;" 
    } else if (winner == "O") {
        oScore.innerHTML = `O: ${++scoreO}`;
        winnerElement.style = "color: blue;" 
    }

    winnerElement.innerHTML = `Winner: ${winner}`;
    chance =1;
    turns = 1;
}


function setElementColor(markedElement, element) {
    if (markedElement === "X") {
        element.style = "color: red;"
    } else {
        element.style = "color: blue;"
    }
}



function markPoint() {

    const space = document.querySelectorAll('.mark-space');

    space.forEach(element => {

        element.addEventListener('click', function () {


            const id = element.id;
            const row = (id[0] - 1) - '0';
            const column = (id[1] - 1) - '0';

            if (turns == 9) {
                element.style = "pointer-events: none;"
                winnerElement.innerHTML = "Tie!";
                setGridBlank(space);
            }



            if (element.innerHTML === "") {
                markSpace[row][column] = players[chance];
                element.innerHTML = players[chance];
                setElementColor(players[chance], element);

                chance = chance == 0 ? 1 : 0;
                turns++;

                

                let rowSpace = checkRow(markSpace);
                let columnSpace = checkColumn(markSpace);
                let diagonalSpace = checkDiagonal(markSpace);

                let rowCompleted = rowSpace == "" ? 0 : 1;
                let columnCompleted = columnSpace == "" ? 0 : 1;
                let diagonalCompleted = diagonalSpace == "" ? 0 : 1;


                if (rowCompleted) {
                    winner = rowSpace;
                    setGridBlank(space);
                    incrementScore(winner);
                } else if (columnCompleted) {
                    winner = columnSpace;
                    setGridBlank(space);
                    incrementScore(winner);
                } else if (diagonalCompleted) {
                    winner = diagonalSpace;

                    setGridBlank(space);
                    incrementScore(winner);
                }


            }


        })
    })



}




markPoint();

