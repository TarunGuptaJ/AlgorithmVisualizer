var path = new Map();
var DFScoords = [];
var flag = 0;
function DFSreturntemp(grid = [], src, dest, constraints = 0) {
    console.log(src);
    DFS(grid, src[0], src[1], -1, -1, constraints);
    if(flag === 0) {
        path = new Map();
        path[src] = [-2,-2];
        return [DFScoords,path];
    }
    return [DFScoords,getRender(path, src, dest)];

}

function getRender(path, src, dest) {
    let renderPath = [];
    const beginNode = [src[0],src[1]];
    const endNode = [dest[0],dest[1]]; 
    let curr = endNode;
    console.log(path);
    if(path[beginNode]!== [-2,-2]) {
        while(curr[0] !== -1 && curr[1] !==-1 ) {
            renderPath.unshift(curr);
            curr = path[curr];
        }
    
    }
    return renderPath;

}

function DFS(grid = [], row, col, prow, pcol, constraints) {
    var rows = grid.length;
    var cols = grid[0].length;

    if(constraints === 1) {
        cols = 26;
    }
    // console.log(grid[row][col]);
    let initial = 0;
    if(constraints === 2) {
        initial = 25;
    }

    console.log(initial,"dead", constraints);
    if(row >= 0 && col >= initial && row < rows && col < cols && grid[row][col]!== 3 && grid[row][col] !== 5) {
        if(grid[row][col] === 2) {
            path[[row,col]] = [prow,pcol]; 
            flag = 1;
            return;
        }
    
        // var i = [row,col];
        path[[row,col]] = [prow,pcol]; 
    
        if(grid[row][col] !== 2) {
            grid[row][col] = 5;
        }

        console.log([row,col]);
        DFScoords.push([row,col]);
        DFScoords.push(-1);
    
        if(flag !== 1) {
            DFS(grid, row+ 1, col, row, col, constraints); // go right
            DFS(grid, row- 1, col, row, col, constraints); //go left
            DFS(grid, row, col + 1, row, col, constraints); //go down
            DFS(grid, row, col - 1, row, col, constraints); // go up
        }
        else {
            return;
        }
        
    }
    return;
    
        
}

export default DFSreturntemp;