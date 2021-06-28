let chance = 1;
let players = ['O', 'X'];
var turns = 1;
var markSpace = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
var winner = "";

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
    }, 1000)
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
            }

            if (element.innerHTML === "") {
                markSpace[row][column] = players[chance];
                element.innerHTML = players[chance];
                chance = chance == 0 ? 1 : 0;
                turns++;

                let rowSpace = checkRow(markSpace);
                let columnSpace = checkColumn(markSpace);
                let diagonalSpace = checkDiagonal(markSpace);

                let rowCompleted = rowSpace == "" ? 0 : 1;
                let columnCompleted = columnSpace == "" ? 0 : 1;
                let diagonalCompleted = diagonalSpace == "" ? 0 : 1;

                const winnerElement = document.getElementById('winner');

                if (rowCompleted) {
                    winner = rowSpace;
                    console.log(winner);
                    winnerElement.innerHTML = `Winner: ${winner}`;
                    setGridBlank(space);


                } else if (columnCompleted) {
                    winner = columnSpace;
                    console.log(winner);
                    winnerElement.innerHTML = `Winner: ${winner}`;
                    setGridBlank(space);
                } else if (diagonalCompleted) {
                    winner = diagonalSpace;
                    console.log(winner);
                    winnerElement.innerHTML = `Winner: ${winner}`;
                    setGridBlank(space);
                }

            }


        })
    })

    console.log("hello");



}




markPoint();

