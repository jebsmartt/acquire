import { 
  startGame,
  drawTile,
  getPlayerTileTray,
  removeTileFromTray
} from '../backend/engine.js';

const NUM_ROWS = 9
const NUM_COLS = 10
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Establish hotel tiers
const budgetHotels = ['tower','luxor']
const standardHotels = ['american','worldwide','festival']
const premiumHotels = ['imperial','continental']

// HTML Elements
const gameboard = document.getElementById('gameboard')
const grid = document.getElementById('grid')
const marketplace = document.getElementById('marketplace')
const budgetHotelsDiv = document.getElementById('budget-hotels')
const standardHotelsDiv = document.getElementById('standard-hotels')
const premiumHotelsDiv = document.getElementById('premium-hotels')

function toTitleCase(str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

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

// Create the marketplace, where remaining shares are shown
function createMarketplace (session) {
  let hotels = [
    budgetHotels,
    standardHotels,
    premiumHotels
  ]

  let hotelDivs = [
    budgetHotelsDiv,
    standardHotelsDiv,
    premiumHotelsDiv
  ]

  for (let i=0;i<hotels.length;i++) {
    populateHotelTier(hotels[i],hotelDivs[i])
  }  

  function populateHotelTier (hotelArray,elementID) {
    hotelArray.forEach(hotel => {
      const shareMarket = document.createElement('div')
      elementID.appendChild(shareMarket)
      shareMarket.textContent = `${hotel} - ${session[hotel]}`
      shareMarket.setAttribute('class','marketplace-share-div')
    });
  }
}

// Create a zone for the player to have their tiles and shares
function createPlayerZone(numPlayers) {
  const playerZoneCollection = document.getElementById('player-zone-collection')

  for (let i=1;i <= numPlayers;i++) {
    //create div for each player
    const playerZone = document.createElement('div')
    playerZoneCollection.appendChild(playerZone)
    
    playerZone.setAttribute('id',`player${i}-zone`)
    playerZone.setAttribute('class',`player-zones`)
  
    // Step 1: Create the elements for each playerZone
    const tileTray = document.createElement('div')
    // const messageBox = document.createElement('div')
    const shareCollection = document.createElement('div')
    
    const tileTrayTitle = document.createElement('h3')
    const tileTrayTiles = document.createElement('div')
  
    // const messageBoxTitle = document.createElement('h3')
  
    // Step 2 (Optional): Modify the elements
    tileTrayTitle.textContent = `Player ${i} Tile Tray`
    // messageBoxTitle.textContent = "Hello World!"
    shareCollection.textContent = "This is the share collection area"
  
    // Step 3: Add the element to the playerZone
    playerZone.appendChild(tileTray)
    // playerZone.appendChild(messageBox)
    playerZone.appendChild(shareCollection)
  
    tileTray.appendChild(tileTrayTitle)
    tileTray.appendChild(tileTrayTiles)
  
    // messageBox.appendChild(messageBoxTitle)
  
  
    tileTray.setAttribute('id',`player${i}-tile-tray-div`)
    tileTray.setAttribute('class',`tile-tray`)
    tileTrayTiles.setAttribute('id', `player${i}-tile-tray`)
    tileTrayTiles.setAttribute('class','grid-row')
    // messageBox.setAttribute('id',`player${i}-message-box-div`)
    // messageBox.setAttribute('class',`player-zone-component`)
    shareCollection.setAttribute('id',`player${i}-share-collection-div`)
    shareCollection.setAttribute('class',`share-collection`)

    // Display the players tiles in UI
    displayPlayerTiles(getPlayerTileTray(session,i),i)
  }
  
  // Highlight active player
  highlightActivePlayer(session)
}

function displayPlayerTiles(tiles,playerID) {
  let tileTray = document.getElementById(`player${playerID}-tile-tray`)

  // clear div if not empty
  while (tileTray.firstChild) {
    tileTray.removeChild(tileTray.firstChild)
  } 

  tiles.forEach(tile => {
    let tileDiv = document.createElement('div')
    tileDiv.textContent = tile.name

    tileTray.appendChild(tileDiv)
    tileDiv.setAttribute('class','grid-cell')
    tileDiv.setAttribute('id',`${tile.name}-tray`)

  });
}

function playTile(session, playerID, tileName) {
  let matchingGridTile = document.getElementById(tileName)
  matchingGridTile.classList.toggle('grid-cell-played')

  // remove tile from tray
  let tileInTray = document.getElementById(`${tileName}-tray`)
  tileInTray.remove()

  //remove tile from player object
  removeTileFromTray(session, playerID, tileName)

  takeTurn(session, playerID, 2)
  // setTimeout(() => {
  //   takeTurn(session, playerID, 2);
  // }, 2000);
}

function buyStock(playerID) {
  // Call only once stock phase is over
  takeTurn(session, playerID,3)
}

function endTurn(session) {
  highlightActivePlayer(session)
  if (session.activePlayer < session.players.length) {
    session.activePlayer += 1
  } else {
    session.activePlayer = 1
  }
  console.log(`session.activePlayer set to ${session.activePlayer}`)
  highlightActivePlayer(session)
  takeTurn(session, session.activePlayer,1)
}

function highlightActivePlayer(session) {
  let target = document.getElementById(`player${session.activePlayer}-zone`)
  target.classList.toggle('player-zones-active')
}




function takeTurn(session, playerID, phase) {
  // Phase 1: Play a Tile
  // Phase 2: Buy Stock
  // Phase 3: End Turn

  if (phase === 1) {
    console.log("Its now Phase 1 of the turn")
    // Allow player to play a tile
    let tileTray = document.getElementById(`player${playerID}-tile-tray`)
    let tiles = tileTray.querySelectorAll('div');
    
    function handleClickTile() {
      playTile(session,playerID,this.textContent)
    }

    tiles.forEach((tile) => {
      tile.addEventListener('click', handleClickTile)
      tile.classList.toggle('grid-cell-clickable')
    })

  } else if (phase === 2) {
    console.log("Its now Phase 2 of the turn")
    // Remove ability to play tile
    let tileTray = document.getElementById(`player${playerID}-tile-tray`)
    let tiles = tileTray.querySelectorAll('div');
    
    tiles.forEach((tile) => {
      tile.classList.toggle('grid-cell')
      tile.removeEventListener('click', function() {
        playTile(tile.name)
      })
    })

    // Allow player to buy stock
    buyStock(playerID)

  } else if (phase === 3) {
    console.log("Its now Phase 3 of the turn")
    drawTile(session, playerID)
    displayPlayerTiles(getPlayerTileTray(session,playerID),playerID)
    endTurn(session, playerID)
  }
}

const numPlayers = 2 
window.session = startGame(numPlayers)
createMarketplace(session)
createPlayerZone(numPlayers)
takeTurn(session,session.activePlayer,1)