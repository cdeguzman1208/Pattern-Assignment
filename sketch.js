// Constants
const numArtworks = 2;  // Number of artworks in the gallery
let currentArtwork = 0;  // Index of the currently displayed artwork
let cols, rows;  // Declare cols and rows globally
let resolution = 10;  // Define resolution for cellular automaton

// Setup function
function setup() {
    createCanvas(800, 600);  // Create a canvas
    cols = width / resolution;  // Calculate number of columns
    rows = height / resolution;  // Calculate number of rows
    noLoop();  // No continuous redraw by default
}

// Draw function (not used for continuous drawing)
function draw() {
    // Clear background
    background(255);

    // Display the current artwork based on index
    switch (currentArtwork) {
        case 0:
            drawArtwork1();
            break;
        case 1:
            drawArtwork2();
            break;
        // Add more cases for additional artworks
    }
}

// Function to draw Artwork 1 with color
function drawArtwork1() {
    for (let x = 0; x < width; x += 10) {
        for (let y = 0; y < height; y += 10) {
            let noiseVal = noise(x * 0.01, y * 0.01);
            let r = map(noiseVal, 0, 1, 50, 255);
            let g = map(noiseVal, 0, 1, 100, 200);
            let b = map(noiseVal, 0, 1, 150, 255);
            fill(r, g, b);
            noStroke();
            rect(x, y, 10, 10);
        }
    }
}

// Function to draw Artwork 2 with color
function drawArtwork2() {
    let grid = [];

    // Initialize grid randomly
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = random() > 0.5 ? 1 : 0;
        }
    }

    // Update the grid based on cellular automaton rules
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);
            if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                grid[i][j] = 0;
            } else if (state == 0 && neighbors == 3) {
                grid[i][j] = 1;
            }
            let c = color(map(i, 0, cols, 0, 255), map(j, 0, rows, 0, 255), 150);
            fill(state == 1 ? c : 255);
            stroke(0);
            rect(i * resolution, j * resolution, resolution, resolution);
        }
    }
}

// Function to count live neighbors for cellular automaton
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

// Function to switch to the next artwork
function nextArtwork() {
    currentArtwork = (currentArtwork + 1) % numArtworks;
    redraw();  // Redraw canvas with the new artwork
}

// Mouse click event to switch artwork
function mouseClicked() {
    nextArtwork();
}
