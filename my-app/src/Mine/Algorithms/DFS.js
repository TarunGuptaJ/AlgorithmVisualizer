var path = new Map();
var DFScoords = [];
var flag = 0;
function DFSreturn(grid = [], src, dest) {
    console.log("DFSreturn")
    DFS(grid, src[0], src[1], -1, -1);
    console.log("yayy");
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
            console.log("checking",curr,path[curr]);
            renderPath.unshift(curr);
            curr = path[curr];
        }
    
    }
    return renderPath;

}

function DFS(grid = [], row, col, prow, pcol) {
    console.log("inside DFS");
    var rows = grid.length;
    var cols = grid[0].length;
    // console.log(grid[row][col]);
    if(row >= 0 && col >= 0 && row < rows && col < cols && grid[row][col]!== 3 && grid[row][col] !== 5) {
        if(grid[row][col] === 2) {
            path[[row,col]] = [prow,pcol]; 
            flag = 1;
            console.log("yaya");
            return;
        }
    
        console.log("DFS in");
    
        // var i = [row,col];
        path[[row,col]] = [prow,pcol]; 
    
        if(grid[row][col] !== 2) {
            grid[row][col] = 5;
        }
        DFScoords.push([row,col]);
        DFScoords.push(-1);
    
        if(flag !== 1) {
            DFS(grid, row+ 1, col, row, col); // go right
            DFS(grid, row- 1, col, row, col); //go left
            DFS(grid, row, col + 1, row, col); //go down
            DFS(grid, row, col - 1, row, col); // go up
        }
        else {
            return;
        }
        
    }
    return;
    
        
}

export default DFSreturn;