fetch('../constants.json') // Fetch the JSON file
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Access the parsed JSON data as a JavaScript object
    const NUM_ROWS = data.num_rows;
    const NUM_COLS = data.num_cols;
    const ALPHABET = data.alphabet;

    // Test the constants
    console.log(NUM_ROWS);
    console.log(NUM_COLS);
    console.log(ALPHABET)
  
    // Step 1: Create the element
    const grid = document.createElement('table')

    // Step 2 (Optional): Modify the element

    // Step 3: Add the element to the page
    const gameboard = document.getElementById('gameboard')
    gameboard.appendChild(grid);
    grid.setAttribute('id', 'grid')


    // Add rows and cols to table
    const row_indexes = ALPHABET.slice(0,NUM_ROWS)
    for (let i=0; i < NUM_ROWS; i++) {
        let grid_row = document.createElement('tr')

        grid.appendChild(grid_row)
        grid_row.setAttribute('class','grid-row')

        // Add cols to row
        for (let y=1; y < (NUM_COLS+1); y++) {
            let grid_cell = document.createElement('td')
            let grid_cell_button = document.createElement('button')
            grid_cell_label = `${row_indexes[i]}${y}`
            grid_cell_button.textContent = grid_cell_label

            grid_row.appendChild(grid_cell)
            grid_cell.appendChild(grid_cell_button)
            grid_cell.setAttribute('id', grid_cell_label)
            grid_cell.setAttribute('class', 'grid-cell')
            grid_cell_button.setAttribute('id', `${grid_cell_label}_button`)
            grid_cell_button.setAttribute('class', 'grid-cell-button')
        }

    }   

  })
  .catch(error => console.error('Error fetching/parsing JSON:', error));


