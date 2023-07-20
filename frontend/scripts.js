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
        grid_cell_label = `${row_indexes[i]}${y}`
        grid_cell.textContent = grid_cell_label

        grid_row.appendChild(grid_cell)
        grid_cell.setAttribute('id', grid_cell_label)
        grid_cell.setAttribute('class', 'grid-cell')

        // // Add click event listener to each button
        // clickEventListener(grid_cell_label)
    }

}

// Create a zone for the player to have their tiles and shares
function createPlayerZone() {
  const playerZone = document.getElementById('player-zone')

  // Step 1: Create the element
  const tileBank = document.createElement('div')
  const shareCollection = document.createElement('div')
  
  // Step 2 (Optional): Modify the element
  tileBank.textContent = "This is the tile bank"
  shareCollection.textContent = "This is the share collection area"

  // Step 3: Add the element to the page
  playerZone.appendChild(tileBank)
  playerZone.appendChild(shareCollection)
  
}

createPlayerZone()