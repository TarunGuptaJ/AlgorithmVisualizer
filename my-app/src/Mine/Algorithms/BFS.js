function getNeighbours(grid = [], node) {
    let rows = grid.length;
    let cols = grid[0].length;
    let row = node[0];
    let col = node[1];
    let neighbours = [];
    if ((row + 1 >= 0) && (row + 1 < rows) && (col >= 0) && (col < cols) && (grid[row + 1][col]!== 3 && grid[row + 1][col] !== 5)) {
        neighbours.push([row + 1, col]);
    }
    if ((row - 1) >= 0 && row - 1 < rows && col >= 0 && col < cols && (grid[row - 1][col] !== 3 && grid[row - 1][col] !== 5)) {
        neighbours.push([row - 1, col]);
    }
    if ((row) >= 0 && row < rows && col + 1 >= 0 && col + 1 < cols && (grid[row][col+1] !== 3 && grid[row][col+1] !== 5)) {
        neighbours.push([row, col + 1]);
    }
    if ((row) >= 0 && row < rows && col - 1 >= 0 && col - 1 < cols && (grid[row][col-1] !== 3 && grid[row][col-1] !== 5)) {
        neighbours.push([row, col - 1]);
    }
    return neighbours;

}

function BFS(grid = [], src, dest) {
    console.log("inside BFS function",src,dest);
    const queue = [];
    const BFScoords = [];
    queue.push(src);
    grid[src[0]][src[1]] = 5;
    while(queue.length > 0) {
        let start = queue.shift();
        const adjacents = getNeighbours(grid,start);
        for(const i of adjacents) {
            if(grid[i[0]][i[1]] !== 2)
                grid[i[0]][i[1]] = 5;

            if(grid[i[0]][i[1]] === 2)
                return BFScoords;
            
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
    return BFScoords;
}

export default BFS;