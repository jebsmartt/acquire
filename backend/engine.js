const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function startGame() {
    let sessionDetails = {
        tileBag: createTileBag()
    }
    return sessionDetails
}

function createTileBag() {
    const tileBag = []
    let rowList = ALPHABET.split('').slice(0,NUM_ROWS)

    for (let i=0;i < rowList.length;i++) {
        for (let n=1;n<(NUM_COLS+1);n++) {
            tileBag.push(
                {
                    name: `${rowList[i]}${n}`,
                    row: rowList[i],
                    number: n
                }
            )
        }
    }
    return tileBag
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function drawTile(session, numberOfTiles=1) {
    let indexToPull = getRandomInt(0,session.tileBag.length)
    const removedTiles = session.tileBag.splice(indexToPull,numberOfTiles)
    return removedTiles
}

const session = startGame()
console.log(drawTile(session,6)[0].name)








// From old version of project...may be reused
// Listen for click of button on gameboard grid
// function clickEventListener(id) {
//     const grid_cell = document.getElementById(id)

//     grid_cell.addEventListener('click', function() {
//         console.log(`The ${id} cell was clicked`)
//         grid_cell.classList.toggle('grid-cell-played')
//     });
// }

