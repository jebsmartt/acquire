const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Establish hotel tiers
const budgetHotels = ['tower','luxor']
const standardHotels = ['american','worldwide','festival']
const premiumHotels = ['imperial','continental']

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
        tower: 25,
        luxor: 25,
        american: 25,
        worldwide: 25,
        festival: 25,
        imperial: 25,
        continental: 25,
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

// Provides object with corresponding value(s) of an individual share
// ...given the current size of the hotel chain
function getShareValue(hotel, hotelSize) {
    // takes hotel and makes lowercase
    let hotelName = hotel.toLowerCase()
    
    // Create share value reference table
    const shareValueReferenceArray = []
    for (let s=200;s<=1200;s+=100) {
        shareValueReferenceArray.push(
            {valuePerShare: s, firstBonus: s*10, secondBonus: s*10/2}
        )
    }
    
    // Determine what index to use to search the reference array
    function getReferenceTableIndex() {
        if (hotelSize < 2) {
            return console.log('Unexpected: Hotel size less than 2')
        } else if (hotelSize >= 2 && hotelSize <= 5) {
            return (hotelSize - 2)
        } else if (hotelSize >= 6 && hotelSize <= 10) {
            return 4
        } else if (hotelSize >= 11 && hotelSize <= 20) {
            return 5
        } else if (hotelSize >= 21 && hotelSize <= 30) {
            return 6
        } else if (hotelSize >= 31 && hotelSize <= 40) {
            return 7
        } else if (hotelSize >= 41) {
            return 8
        }
    }
    
    // Modifies the search index based on hotelName tier
    function tierModifiedIndex() {
        if (budgetHotels.includes(hotelName)) {
            return getReferenceTableIndex(hotelSize)
        } else if (standardHotels.includes(hotelName)) {
            return getReferenceTableIndex((hotelSize+1))
        } else if (premiumHotels.includes(hotelName)) {
            return getReferenceTableIndex((hotelSize+2))
        }
    }

    // Should copy the object at the index provided by tierModifiedIndex
    let shareReferenceValues = shareValueReferenceArray[tierModifiedIndex()]
    // Should return an object
    return shareReferenceValues
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

