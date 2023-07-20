

// Listen for click of button on gameboard grid
function clickEventListener(id) {
    const grid_cell = document.getElementById(id)

    grid_cell.addEventListener('click', function() {
        console.log(`The ${id} cell was clicked`)
        grid_cell.classList.toggle('grid-cell-played')
    });
}