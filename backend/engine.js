const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function getPlayerTileBank(session, playerID) {
    let player = getPlayerByID(session,playerID)
    return player.tileBank
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
    
    player.tileBank.push(...removedTiles)
}

export function startGame(numPlayers) {
    let session = {
        tileBag: createTileBag(),
        players: createPlayers(numPlayers)
    }

    session.players.forEach(player => {
        drawTile(session,player.id,6)
    });
    return session
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