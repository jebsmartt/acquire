import { startGame,drawTile,getPlayerTileTray } from '../backend/engine.js';

const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Step 1: Create the element
const grid = document.createElement('div')

// Step 2 (Optional): Modify the element

// Step 3: Add the element to the page
const gameboard = document.getElementById('gameboard')
gameboard.appendChild(grid);
grid.setAttribute('id', 'grid')


// Add rows and cols to table
const row_indexes = ALPHABET.slice(0,NUM_ROWS)
for (let i=0; i < NUM_ROWS; i++) {
    let grid_row = document.createElement('div')

    grid.appendChild(grid_row)
    grid_row.setAttribute('class','grid-row')

    // Add cols and buttons to row
    for (let y=1; y < (NUM_COLS+1); y++) {
        let grid_cell = document.createElement('div')
        let grid_cell_label = `${row_indexes[i]}${y}`
        grid_cell.textContent = grid_cell_label

        grid_row.appendChild(grid_cell)
        grid_cell.setAttribute('id', grid_cell_label)
        grid_cell.setAttribute('class', 'grid-cell')
    }

}

// Create a zone for the player to have their tiles and shares
function createPlayerZone() {
  const playerZone = document.getElementById('player-zone')

  // Step 1: Create the element
  const tileTray = document.createElement('div')
  const messageBox = document.createElement('div')
  const shareCollection = document.createElement('div')
  
  const tileTrayTitle = document.createElement('h3')
  const tileTrayTiles = document.createElement('div')

  const messageBoxTitle = document.createElement('h3')

  // Step 2 (Optional): Modify the element
  tileTrayTitle.textContent = "Tile Tray"
  messageBoxTitle.textContent = "Hello World!"
  shareCollection.textContent = "This is the share collection area"

  // Step 3: Add the element to the page
  playerZone.appendChild(tileTray)
  playerZone.appendChild(messageBox)
  playerZone.appendChild(shareCollection)

  tileTray.appendChild(tileTrayTitle)
  tileTray.appendChild(tileTrayTiles)

  messageBox.appendChild(messageBoxTitle)


  tileTray.setAttribute('id','player-tile-tray-div')
  tileTrayTiles.setAttribute('id', 'player-tile-tray')
  tileTrayTiles.setAttribute('class','grid-row')
  messageBox.setAttribute('id','player-message-box-div')
  shareCollection.setAttribute('id','player-share-collection-div')


  
}

function displayPlayerTiles(tiles) {
  let tileTray = document.getElementById('player-tile-tray')

  tiles.forEach(tile => {
    let tileDiv = document.createElement('div')
    tileDiv.textContent = tile.name

    tileTray.appendChild(tileDiv)
    tileDiv.setAttribute('class','grid-cell')

  });
}

function playTile(playerID, tileName) {
  let matchingGridTile = document.getElementById(tileName)
  matchingGridTile.classList.toggle('grid-cell-played')

  takeTurn(playerID, 2)
}

function buyStock(playerID) {
  const userInput = prompt('Buy stock: ')
  if(userInput === "y") {
    console.log("Let's pretend that a player bought stock!")
  } 

  // Call only once stock phase is over
  takeTurn(playerID,3)
}

function endTurn(session) {
  if (session.activePlayer < session.players.length) {
    session.activePlayer += 1
  } else {
    session.activePlayer = 1
  }
  console.log(`Session.ActivePlayer set to ${session.activePlayer}`)
  takeTurn(session.activePlayer,1)
}

function takeTurn(playerID, phase) {
  // Phase 1: Play a Tile
  // Phase 2: Buy Stock
  // Phase 3: End Turn

  if (phase === 1) {
    console.log("Its now Phase 1 of the turn")
    // Allow player to play a tile
    let tileTray = document.getElementById('player-tile-tray')
    let tiles = tileTray.querySelectorAll('div');
    
    function handleClickTile() {
      playTile(playerID,this.textContent)
    }

    tiles.forEach((tile) => {
      tile.addEventListener('click', handleClickTile)
    })

  } else if (phase === 2) {
    console.log("Its now Phase 2 of the turn")
    // Remove ability to play tile
    let tileTray = document.getElementById('player-tile-tray')
    let tiles = tileTray.querySelectorAll('div');
    
    tiles.forEach((tile) => {
      tile.removeEventListener('click', function() {
        playTile(tile.name)
      })
    })

    // Allow player to buy stock
    buyStock(playerID)

  } else if (phase === 3) {
    console.log("Its now Phase 3 of the turn")
    drawTile(session, playerID)
    endTurn(session, playerID)
  }
}

createPlayerZone()
window.session = startGame(1)
displayPlayerTiles(getPlayerTileTray(session,1))
takeTurn(session.activePlayer,1)