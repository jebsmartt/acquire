fetch('../constants.json') // Fetch the JSON file
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Access the parsed JSON data as a JavaScript object
    const NUM_ROWS = data.num_rows;
    const NUM_COLS = data.num_cols;

    // Test the constants
    console.log(NUM_ROWS);
    console.log(NUM_COLS);
  })
  .catch(error => console.error('Error fetching/parsing JSON:', error));


// Step 1: Create the element
const grid = document.createElement('table')

// Step 2 (Optional): Modify the element


// Step 3: Add the element to the page
const gameboard = document.getElementById('gameboard')
gameboard.appendChild(grid);


// Add rows to table
for (let i=0; i < NUM_ROWS; i++) {
    let grid_row = document.createElement('tr')

    grid.appendChild(grid_row)

}

// Step 1: Create the element
const helloWorld = document.createElement('p');

// Step 2 (Optional): Modify the element
helloWorld.textContent = "Hello World!";

// Step 3: Add the element to the page
const containerDiv = document.getElementById('gameboard');
containerDiv.appendChild(helloWorld);