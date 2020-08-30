// Helper function to delete element scam :)
function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = Math.sqrt ((a.i-b.i)*(a.i-b.i) + (a.j-b.j)*(a.j-b.j))
    return d;
}

function nodeDesc(i,j,grid) {
    this.i = i;
    this.j = j;

    this.dist = 0;

    this.visited = false;

    this.neighbours = [];
    this.previous = undefined;

    this.wall = false;

    this.addNeighbours = function(tempGrid, constraints) {
        // console.log("hereer");
        // console.log(tempGrid);
        var i = this.i;
        var j = this.j;
        var rows = tempGrid.length;
        var cols = tempGrid[0].length;
        this.neighbours = [];

        let initial = 0;
        if(constraints === 1) {
            cols = 26;
        }

        if(constraints === 2) {
            initial = 25;
        }

        if (i < cols - 1) {
            // console.log("shouldnt");
            this.neighbours.push(tempGrid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbours.push(tempGrid[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbours.push(tempGrid[i][j + 1]);
        }
        if (j > initial) {
            this.neighbours.push(tempGrid[i][j - 1]);
        }    
    };
}


// Greedy Best First Search
function GBFS(grid = [], src, dest, constraints = 0) {
    var rows = grid.length;
    var cols = grid[0].length;

    var myVisited = [];
    var myPath = [];

    var tempGrid = new Array(cols);
    
    var pqueue = [];
    var foundPath = 0;

    var start;
    var end;

    var path = [];

    for (let i = 0; i < cols; i++) {
        tempGrid[i] = new Array(rows);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tempGrid[i][j] = new nodeDesc(i, j);
            if(grid[i][j] === 3) {
                tempGrid[i][j].wall = true;
            }
        }
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tempGrid[i][j].addNeighbours(tempGrid, constraints);
        }
    }

    start = tempGrid[src[0]][src[1]];
    end = tempGrid[dest[0]][dest[1]];
    // Safety XP
    start.wall = false;
    end.wall = false;

    // Queue
    pqueue.push(start);
    start.visited = true;

    while(pqueue.length) {
        for(let i = 0;i<pqueue.length;++i) {
            pqueue[i].dist = heuristic(pqueue[i],end);
        }

        var winner = 0;
        for (var i = 0; i < pqueue.length; i++) {
            if (pqueue[i].dist < pqueue[winner].dist) {
                winner = i;
            }
        }

        var current = pqueue[winner];
        // console.log(current);
        if (current === end) {
            myVisited.push([current.i,current.j]);
            console.log('DONE!');
            foundPath = 1;
            break;
            
        }

        removeFromArray(pqueue, current);
        
        myVisited.push([current.i,current.j]);
        myVisited.push(-1);

        var neighbours = current.neighbours;
        for(let i = 0;i<neighbours.length;++i) {
            var neighbour = neighbours[i];
            if(!pqueue.includes(neighbour) && (neighbour!==undefined) && !neighbour.wall && !neighbour.visited) {
                pqueue.push(neighbour);
                neighbour.visited = true;
                neighbour.previous = current;
            }
        }
    }

    if(foundPath === 1) {
        path = [];
        var temp = current;
        path.push(temp);
        myPath.push([temp.i,temp.j]);
        while (temp.previous) {
            path.push(temp.previous);
            myPath.push([temp.previous.i,temp.previous.j]);
            temp = temp.previous;
        }
        return [myVisited,myPath];
    }
    else {
        myPath = [];
        return [myVisited,myPath];
    }

    
}

export default GBFS;