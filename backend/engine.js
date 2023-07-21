const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function getPlayerTileTray(session, playerID) {
    let player = getPlayerByID(session,playerID)
    return player.tileTray
}

// PlayerID is the ID number, not the player object
export function drawTile(session, playerID, numberOfTiles=1) {
    let player = getPlayerByID(session,playerID)
    let removedTiles = []
    for (let i=0;i<numberOfTiles;i++) {
        let indexToPull = getRandomInt(0,(session.tileBag.length-1))
        let removedTile = session.tileBag.splice(indexToPull,1)
        removedTiles.push(...removedTile)
    }
    
    player.tileTray.push(...removedTiles)
}

// Create game session instance
export function startGame(numPlayers) {
    let session = {
        tileBag: createTileBag(),
        players: createPlayers(numPlayers),
        activePlayer: 1
    }

    session.players.forEach(player => {
        drawTile(session,player.id,6)
    });
    return session
}

export function removeTileFromTray(session, playerID, tileName) {
    let player = getPlayerByID(session,playerID)
    const foundElement = player.tileTray.find((tile) => tile.name === tileName);

    const indexToRemove = player.tileTray.indexOf(foundElement);
    console.log(indexToRemove)
    if (indexToRemove !== -1) {
    session.players[(playerID-1)].tileTray.splice(indexToRemove, 1);
    }
}

function createTileBag() {
    const tileBag = []
    let rowList = ALPHABET.split('').slice(0,NUM_ROWS)

    for (let i=0;i < rowList.length;i++) {
        for (let n=1;n<=NUM_COLS;n++) {
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
            tileTray: [],
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

