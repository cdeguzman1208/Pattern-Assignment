# Pattern-Assignment

## Requirements:
- Create a system that generates a repeating patterns using <ins>**more than one algorithm**</ins> (does not need to be one shown in class)
  - *Examples include Noise (Perlin/Simplex), Cellular Automata, Autonomous Agents, Point Distribution, Voronoi, and more.*
- This pattern should be either repeating (near-infinite) -or- update over time (cellular automata)
  - Perlin for instance is near-infinite, and cellular automata or agents are by their nature updating over time
- The viewer should be able to influence the pattern, either before generation or during generation
- This pattern can be visual, auditory, data, or multimedia as long as you can share multiple example outputs

## Submission:

**GitHub Repository:** https://github.com/cdeguzman1208/Pattern-Assignment

**Deployment Page:**

## Description:

### Global Variables and Constants
- numArtworks: This constant defines the total number of artworks in the gallery.
- currentArtwork: This variable keeps track of the index of the currently displayed artwork.
- cols and rows: These variables will store the number of columns and rows for the grid used in the cellular automaton artwork.

### Setup Function
- setup(): This function is called once when the program starts. It initializes the canvas with a width of 800 pixels and height of 600 pixels using createCanvas().
- cols = width / resolution; and rows = height / resolution;: Here, we calculate the number of columns (cols) and rows (rows) for the cellular automaton grid based on the canvas dimensions and a resolution value (which should be defined elsewhere in the code).
- noLoop(): This function prevents the draw() function from continuously executing, as we'll manually trigger redraws when needed.

### Draw Function
- draw(): This function is continuously executed after setup(), but since we called noLoop(), we need to manually redraw the canvas when necessary.
- background(255);: Clears the canvas by filling it with white (RGB value of 255).
- switch (currentArtwork) { ... }: Based on the value of currentArtwork, it calls a specific function (drawArtwork1() or drawArtwork2()) to draw the selected artwork.

### Artwork Drawing Functions

drawArtwork1()
- This function uses Perlin noise to generate a grid of rectangles.
- It iterates over the canvas (width and height) in steps of 10 pixels.
- noiseVal = noise(x * 0.01, y * 0.01); calculates Perlin noise value at each point.
- grayscale = map(noiseVal, 0, 1, 0, 255); maps noise value to grayscale color.
- fill(grayscale);: Sets the fill color based on the mapped grayscale value.
- noStroke();: Disables stroke (border) for the rectangles.
- rect(x, y, 10, 10);: Draws a rectangle at position (x, y) with a size of 10x10 pixels.
- We map the Perlin noise value to RGB color values
- This generates a range of colors based on the noise value.
- We then use these RGB values to set the fill color for each rectangle

drawArtwork2()
- This function implements a simple cellular automaton.
- It initializes a 2D array (grid) to represent the cellular automaton grid.
- resolution determines the size of each cell.
- It randomly initializes the grid with cells having a state of 1 (alive) or 0 (dead).
- It then iterates over each cell, applies cellular automaton rules to update cell states, and draws cells on the canvas accordingly using rectangles (rect()).
- We create a color c based on the position (i, j) in the grid
- This gives each cell a color that varies with its position.
- We fill cells with color c if they are alive (state == 1) and white if they are dead (state == 0)

### Helper Functions

countNeighbors(grid, x, y)
- This function counts the number of live neighbors (cells with state 1) surrounding a given cell (x, y) on the grid.
- It uses modulo (%) to handle edge wrapping (toroidal grid) for boundary conditions.

### Event Handling Functions

nextArtwork()
- This function increments the currentArtwork index to switch to the next artwork.
- It uses modulo operator (%) to cycle back to the first artwork after reaching the last one.
- redraw(); triggers a redraw of the canvas to display the newly selected artwork.

mouseClicked()
- This function is an event handler that gets called whenever a mouse click occurs on the canvas.
- It simply calls nextArtwork() to switch to the next artwork when the canvas is clicked.

### Summary
- The code sets up a P5.js sketch with multiple generative artworks (drawArtwork1() and drawArtwork2()).
- It allows switching between artworks using mouse clicks (mouseClicked() event).
- The cellular automaton artwork (drawArtwork2()) simulates cell interactions based on predefined rules (countNeighbors() function) and updates the canvas accordingly.