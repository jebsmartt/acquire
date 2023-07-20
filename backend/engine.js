const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


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

function createPlayers(numPlayers) {
    let playerArray = []
    for (let i=1;i<(numPlayers+1);i++) {
        let playerDetails = {
            id : i,
            name: `Player ${i}`,
            tileBank: [],
            shareCollection: [],
        }
        playerArray.push(playerDetails)
    }
    return playerArray 
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getPlayerByID(session, playerID) {
    // returns a player object
    return session.players[(playerID-1)]
}

// PlayerID is the ID number, not the player object
function drawTile(session, playerID, numberOfTiles=1) {
    let player = getPlayerByID(session,playerID)
    let removedTiles = []
    for (let i=0;i<numberOfTiles;i++) {
        let indexToPull = getRandomInt(0,session.tileBag.length)
        let removedTile = session.tileBag.splice(indexToPull,1)
        removedTiles.push(...removedTile)
    }
    
    player.tileBank.push(...removedTiles)
}

function startGame(numPlayers) {
    let session = {
        tileBag: createTileBag(),
        players: createPlayers(numPlayers)
    }

    session.players.forEach(player => {
        drawTile(session,player.id,6)
    });
    return session
}

const session = startGame(1)


// console.log(drawTile(session,6)[0].name)








// From old version of project...may be reused
// Listen for click of button on gameboard grid
// function clickEventListener(id) {
//     const grid_cell = document.getElementById(id)

//     grid_cell.addEventListener('click', function() {
//         console.log(`The ${id} cell was clicked`)
//         grid_cell.classList.toggle('grid-cell-played')
//     });
// }

