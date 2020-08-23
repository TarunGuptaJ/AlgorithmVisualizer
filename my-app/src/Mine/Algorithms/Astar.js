function nodeDesc(i,j,grid) {
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbours = [];
    this.previous = undefined;

    this.wall = false;

    this.addNeighbours = function(grid) {
        var i = this.i;
        var j = this.j;
        if (i < cols - 1) {
            this.neighbours.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbours.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbours.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbours.push(grid[i][j - 1]);
        }
        if (i > 0 && j > 0) {
            this.neighbours.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbours.push(grid[i + 1][j - 1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbours.push(grid[i - 1][j + 1]);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbours.push(grid[i + 1][j + 1]);
        }        
    };
}

function AStar(grid = [], src, dest) {
    var rows = grid.length;
    var cols = grid[0].length;

    var myVisited;
    var myPath;

    var tempGrid = new Array(cols);

    var openSet = [];
    var closedSet = [];

    var start;
    var end;

    var path = [];

    for (var i = 0; i < cols; i++) {
        tempGrid[i] = new Array(rows);
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            tempGrid[i][j] = new Spot(i, j);
            if(grid[i][j] === 3) {
                tempGrid[i][j].wall = true;
            }
        }
    }
    
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            tempGrid[i][j].addNeighbors(grid);
        }
    }

    start = grid[src[0]][src[1]];
    end = grid[dest[0]][dest[1]];
    // Safety XP
    start.wall = false;
    end.wall = false;

    openSet.push(start);

    while(openSet.length !== 0) {
        
    }
}

export default AStar;