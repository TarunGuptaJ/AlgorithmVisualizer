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

    this.f = 0;
    this.g = 0;
    this.h = 0;

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
        if(constraints === 1) {
            cols = 26;
        }
        this.neighbours = [];

        let initial = 0;
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
        // if (i > 0 && j > 0) {
        //     this.neighbours.push(tempGrid[i - 1][j - 1]);
        // }
        // if (i < cols - 1 && j > 0) {
        //     this.neighbours.push(tempGrid[i + 1][j - 1]);
        // }
        // if (i > 0 && j < rows - 1) {
        //     this.neighbours.push(tempGrid[i - 1][j + 1]);
        // }
        // if (i < cols - 1 && j < rows - 1) {
        //     this.neighbours.push(tempGrid[i + 1][j + 1]);
        // }        
    };
}

function AStar(grid = [], src, dest, constraints = 0) {
    var rows = grid.length;
    var cols = grid[0].length;

    var myVisited = [];
    var myPath = [];

    var tempGrid = new Array(cols);

    var openSet = [];
    var closedSet = [];

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

    openSet.push(start);

    while(openSet.length !== 0) {
        // console.log("happens");
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        var current = openSet[winner];
        // console.log(current);
        if (current === end) {
            myVisited.push([current.i,current.j]);
            console.log('DONE!');
            foundPath = 1;
            break;
            
        }

        removeFromArray(openSet, current);
        
        myVisited.push([current.i,current.j]);
        myVisited.push(-1);
        closedSet.push(current);

        var neighbours = current.neighbours;
        for(let i = 0;i<neighbours.length;++i) {
            var neighbour = neighbours[i];
            // console.log(neighbour);
            if(!closedSet.includes(neighbour) && (neighbour!==undefined) && !neighbour.wall) {
                var tempG = current.g + heuristic(neighbour,current);

                var newPath = false;
                if(openSet.includes(neighbour)) {
                    if(tempG < neighbour.g) {
                        neighbour.g = tempG;
                        newPath = true;
                    }
                }
                else {
                    neighbour.g = tempG;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if(newPath) {
                    neighbour.h = heuristic(neighbour,end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
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

export default AStar;