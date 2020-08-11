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
    // const start = src;
    queue.push(src);
    grid[src[0]][src[1]] = 5;
    var j = 800;
    while(queue.length > 0) {
        console.log("lel");
        if(j === 0)
            return BFScoords;
        let start = queue.shift();
        const adjacents = getNeighbours(grid,start);
        --j;
        // console.log(BFScoords);
        for(const i of adjacents) {
            grid[i[0]][i[1]] = 5;
            BFScoords.push(i);
            queue.push(i);
            if(i[0] === dest[0] && i[1] === dest[1]) {
                console.log("nahii");
                return BFScoords;
            }
        }
        

    }
}

export default BFS;