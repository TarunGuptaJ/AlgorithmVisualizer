function getNeighbours(grid = [], node, constraints) {
    let rows = grid.length;
    let cols = grid[0].length;
    if(constraints === 1) {
        cols = 26;
    }
    let row = node[0];
    let col = node[1];
    let neighbours = [];
    let initial = 0;
    if(constraints === 2) {
        initial = 25
    }
    if ((row + 1 >= 0) && (row + 1 < rows) && (col >= initial) && (col < cols) && (grid[row + 1][col]!== 3 && grid[row + 1][col] !== 5)) {
        neighbours.push([row + 1, col]);
    }
    if ((row - 1) >= 0 && row - 1 < rows && col >= initial && col < cols && (grid[row - 1][col] !== 3 && grid[row - 1][col] !== 5)) {
        neighbours.push([row - 1, col]);
    }
    if ((row) >= 0 && row < rows && col + 1 >= initial && col + 1 < cols && (grid[row][col+1] !== 3 && grid[row][col+1] !== 5)) {
        neighbours.push([row, col + 1]);
    }
    if ((row) >= 0 && row < rows && col - 1 >= initial && col - 1 < cols && (grid[row][col-1] !== 3 && grid[row][col-1] !== 5)) {
        neighbours.push([row, col - 1]);
    }
    return neighbours;

}

function getRender(path, src, dest) {
    let renderPath = [];
    const beginNode = [src[0],src[1]];
    const endNode = [dest[0],dest[1]]; 
    let curr = endNode;
    if(path[beginNode]!== [-2,-2]) {
        while(curr[0] !== -1 && curr[1] !==-1 ) {
            renderPath.unshift(curr);
            curr = path[curr];
        }
    
    }
    return renderPath;

}



function BFS(grid = [], src, dest, constraints = 0) {
    const queue = [];
    const BFScoords = [];
    // Finding shortest Path
    let path = new Map();
    path[src] = [-1,-1];

    queue.push(src);
    grid[src[0]][src[1]] = 5;
    while(queue.length > 0) {
        let start = queue.shift();
        const adjacents = getNeighbours(grid,start, constraints);
        for(const i of adjacents) {
            path[i] = start;
            if(grid[i[0]][i[1]] !== 2)
                grid[i[0]][i[1]] = 5;

            if(grid[i[0]][i[1]] === 2)
                return [BFScoords,getRender(path,src,dest)];

            BFScoords.push(i);
            queue.push(i);
            
            
            // if(i[0] === dest[0] && i[1] === dest[1]) {
            //     BFScoords.pop();
            //     console.log("Found");
            //     return BFScoords;
            // }
        }
        BFScoords.push(-1);

        

    }
    path = new Map();
    path[src] = [-2,-2];
    return [BFScoords,path];
}

export default BFS;