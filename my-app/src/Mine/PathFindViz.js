import React from 'react';
import './PathFindViz.css';
import NavBar from './NavBar'
import Grid from './Grid'
import BFS from './Algorithms/BFS'
import DFSreturn from './Algorithms/DFS';
import Djikstra from './Algorithms/Djikstra';
import AStar from './Algorithms/Astar';
import GBFS from './Algorithms/GBFS'
import DFSreturntemp from './Algorithms/DFStemp';
import UCS from './Algorithms/UCS';
import generateConfig from './Maze';
class PathFindViz extends React.Component{
    constructor(props){
        super(props);
        this.rows = 20;
        this.cols = 51;

        this.startNode = {
          X:10,Y:10
        }

        this.endNode = {
          X:40,Y:10
        }

        this.secondStartNode = {
          X:41,Y:10
        }

        this.startMovable = false;
        this.endMovable = false;
        this.createWalls = false;

        this.algorithmName = "Nothing";

        this.algoExecuting = false;

        this.dual = false;
        this.algorithm1 = "BFS";
        this.algorithm2 = "DFS";

        this.getInitialGrid = (rows,cols) => {
          var grid = new Array(rows);
          for (let i = 0; i < rows; ++i) {
              grid[i] = new Array(cols);
          }

          // console.log(this.endNode)

          for(let i = 0;i<rows;++i) {
            for(let j = 0;j<cols;++j) {
              if(i === this.startNode.Y && j === this.startNode.X){
                grid[i][j] = 1; // 1 for start node
              }

              else if(i === this.endNode.Y && j === this.endNode.X){
                // console.log("bruh");
                grid[i][j] = 2; // 2 for end node
              }

              else{
                grid[i][j] = 0; // 0 for empty node
              }
            }
          }

          return grid;
        };

        this.state = {
          grid:this.getInitialGrid(this.rows,this.cols)
        }
    }

    // 0 empty, 1 start, 2 end, 3 wall
    // Functions for moving start, end and creating walls
    myMouseDown = (row,col) => {
      if(this.algoExecuting === true) {
        return;
      }
      else if(row === this.startNode.Y && col === this.startNode.X) {
        this.startMovable = true;
      }
      else if(row === this.endNode.Y && col === this.endNode.X) {
        this.endMovable = true;
      }
      else {
        this.createWalls = true;
      }
    }

    myMouseUp = () => {
      
      this.endMovable = false;
      this.startMovable = false;
      this.createWalls = false;
      
    }

    // while mouse is held
    myMouseEnter = (row,col) => {
      if(this.createWalls === true && this.endMovable === true && this.startMovable === true) {
        return;
      }
      else {
        if(this.startMovable) {
          let temp = this.state.grid;
          temp[row][col] = 1;
          temp[this.startNode.Y][this.startNode.X] = 0;
          this.startNode.Y = row;
          this.startNode.X = col;

          if(this.dual) {
            temp[this.secondStartNode.Y][this.secondStartNode.X] = 0; 
            this.secondStartNode.Y = this.startNode.Y;
            this.secondStartNode.X = this.cols - this.startNode.X - 1;
            temp[this.secondStartNode.Y][this.secondStartNode.X] = 1;
          }

          this.setState({
            grid:temp
          })
        }

        else if(this.endMovable) {
          let temp = this.state.grid; 
          temp[row][col] = 2;
          temp[this.endNode.Y][this.endNode.X] = 0;
          this.endNode.Y = row;
          this.endNode.X = col;
          this.setState({
            grid: temp
          })
        }

        // 0 empty, 1 start, 2 end, 3 wall
        else if(this.createWalls) {
          let temp = this.state.grid;
          if(temp[row][col] === 0) {
            temp[row][col] = 3;
          }
          else if(temp[row][col] === 3) {
            temp[row][col] = 0;
          }
          else {
            console.log("NoPE");
          }

          this.setState({
            grid:temp
          })
        }
      }
    }

    // Inverting it, like undoing walls 
    myMouseClick = (row,col) => {
      let temp = this.state.grid;
      if(temp[row][col] === 0) {
        temp[row][col] = 3;
      }
      else if(temp[row][col] === 3) {
        temp[row][col] = 0;
      }

      this.setState({
        grid: temp
      })
    }

    // myMouseClick, myMouseEnter, myMouseDown, myMouseUp

    setAlgoName = (AlgoName, flag) => {
      if(flag === 0) {
        this.algorithmName = AlgoName;
        console.log(this.algorithmName);
      }

      else if(flag === 1) {
        this.algorithm1 = AlgoName;
        console.log(this.algorithm1,"Algorithm1");
      }

      else if(flag === 2) {
        this.algorithm2 = AlgoName;
        console.log(this.algorithm1,"Algorithm2");
      }
      

    }

    animate(traversalNodes,renderPath) {
      var minus1Counter = 0;
      var traversalTime = 0;
      for(let i = 0;i<traversalNodes.length;++i) {
        if(traversalNodes[i]!==-1) {
          setTimeout(() => {
            let node = traversalNodes[i];
            document.getElementById(`${node[0]}_${node[1]}`).className = 'animate';
          },10*minus1Counter);
          traversalTime = 10*minus1Counter;
        }
        else {
          minus1Counter++;
        }
        
      }
      
      for(let i = 0;i<renderPath.length;++i) {
        setTimeout(() => {
          let node = renderPath[i];
          document.getElementById(`${node[0]}_${node[1]}`).className = 'path';
        },traversalTime + 50 + 50*(i+1));
      }

      this.algorithmName = "Nothing";
      this.algoExecuting = false;
    }
    
    // BFS begins 
    getBFScoords = () => {
      // Had to be reversed because left side top node is 0,0 so Y and X axis is inverted
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      var BFStraveralNodes,path; 
      [BFStraveralNodes,path]= BFS(this.state.grid,beginNode,endNode);
      this.animate(BFStraveralNodes,path);
    }
    // BFS ends

    // DFS begins
    getDFScoords = () => {
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      var DFStraversalNodes, path;
      [DFStraversalNodes, path]=DFSreturn(this.state.grid,beginNode,endNode);
      
      this.animate(DFStraversalNodes,path);
    }
    // DFS ends

    // Djikstra begins
    getDJcoords = () => {
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      var DJtraversalNodes, path;
      [DJtraversalNodes, path] = Djikstra(this.state.grid, beginNode, endNode);
      this.animate(DJtraversalNodes,path);

    }
    // Djikstra ends

    // A* begins
    getAScoords = () => {
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      var AStraversalNodes, path;
      [AStraversalNodes, path] = AStar(this.state.grid, beginNode, endNode);
      path = path.reverse();
      this.animate(AStraversalNodes,path);

    }
    // A* ends

    // Greedy Best first search begins
    getGBFScoords = () => {
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      var GBFStraversalNodes, path;
      [GBFStraversalNodes, path] = GBFS(this.state.grid, beginNode, endNode);
      path = path.reverse();
      this.animate(GBFStraversalNodes,path);

    }
    // Greedy best first search ends

    // Uniform Cost Search
    getUCScoords = () => {
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      var UCStraversalNodes, path;
      [UCStraversalNodes, path] = UCS(this.state.grid, beginNode, endNode);
      path = path.reverse();
      this.animate(UCStraversalNodes,path);

    }
    // Uniform Cost search ends

    visualize = () =>{
      if(this.dual === true) {
        this.dualVisualize();
      }
      else {
        console.log("visualize");
        if(this.algoExecuting) {
          return;
        }
        
        if(this.algorithmName === "BFS") {
          this.algoExecuting = true;
          this.getBFScoords();
        }

        else if(this.algorithmName === "DFS") {
          this.algoExecuting = true;
          this.getDFScoords();
        }

        else if(this.algorithmName === "DJ") {
          this.algoExecuting = true;
          this.getDJcoords();
        }

        else if(this.algorithmName === "AS") {
          this.algoExecuting = true;
          this.getAScoords();
        }

        else if(this.algorithmName === "GBFS") {
          this.algoExecuting = true;
          this.getGBFScoords();
        }

        else if(this.algorithmName === "UCS") {
          this.algoExecuting = true;
          this.getUCScoords();
        }
      }
      
    }

    setMaze = (type) =>{
      if(type === "M1") {
        var temp = generateConfig("M1",this.rows,this.cols);
        this.endNode.Y = 1;
        this.endNode.X = 25;
        temp[this.startNode.Y][this.startNode.X] = 1;
        if(this.dual) {
          this.secondStartNode.Y = this.startNode.Y;
          this.secondStartNode.X = this.cols - this.startNode.X - 1;
          temp[this.secondStartNode.Y][this.secondStartNode.X] = 1;
        }
        this.setState({
          grid: temp 
        })
      }
      else if(type === "M2") {
        var temp2 = generateConfig("M2",this.rows,this.cols);
        this.endNode.Y = 10;
        this.endNode.X = 25;
        temp2[this.startNode.Y][this.startNode.X] = 1;
        if(this.dual) {
          this.secondStartNode.Y = this.startNode.Y;
          this.secondStartNode.X = this.cols - this.startNode.X - 1;
          temp2[this.secondStartNode.Y][this.secondStartNode.X] = 1;
        }
        this.setState({
          grid: temp2
        })
      }
      else if(type === "M3") {
        var temp3 = generateConfig("M3",this.rows,this.cols);
        this.endNode.Y = 16;
        this.endNode.X = 25;
        temp3[this.startNode.Y][this.startNode.X] = 1;
        if(this.dual) {
          this.secondStartNode.Y = this.startNode.Y;
          this.secondStartNode.X = this.cols - this.startNode.X - 1;
          temp3[this.secondStartNode.Y][this.secondStartNode.X] = 1;
        }
        this.setState({
          grid: temp3
        })
      }
      // this.setState({
      //   grid: temp
      // })
    }

    // Dual Rendering
    activateDual = () => {
      this.dual = true;
      console.log("dual");
      this.setMaze("M1");
      
    }

    dualVisualize = () => {
      console.log("dual visualize");
      // First point 
      const beginNode = [this.startNode.Y,this.startNode.X];
      // Second point
      const beginNode2 = [this.secondStartNode.Y, this.secondStartNode.X]
      // End point
      const endNode = [this.endNode.Y,this.endNode.X]; 
      
      // All variables
      let visit1 = [];
      let path1 = [];
      let visit2 = [];
      let path2 = [];

      if(this.algoExecuting) {
        return;
      }
      
      let tempgrid = this.state.grid;

      if(this.algorithm1 === "BFS") {
        this.algoExecuting = true;
        [visit1, path1]=BFS(this.state.grid,beginNode,endNode, 1);
      }

      else if(this.algorithm1 === "DFS") {
        this.algoExecuting = true;
        [visit1, path1]=DFSreturn(this.state.grid,beginNode,endNode, 1);
      }

      else if(this.algorithm1 === "BFS") {
        this.algoExecuting = true;
        [visit1, path1]=BFS(this.state.grid,beginNode,endNode, 1);
      }

      else if(this.algorithm1 === "AS") {
        this.algoExecuting = true;
        [visit1, path1]=AStar(this.state.grid,beginNode,endNode, 1);
        path1 = path1.reverse();
      }

      else if(this.algorithm1 === "GBFS") {
        this.algoExecuting = true;
        [visit1, path1]=GBFS(this.state.grid,beginNode,endNode, 1);
        path1 = path1.reverse();
      }

      else if(this.algorithm1 === "UCS") {
        this.algoExecuting = true;
        [visit1, path1]=UCS(this.state.grid,beginNode,endNode, 1);
        path1 = path1.reverse();
      }

      //--------------------------------------------------- Second algorithm -----------------------------------------------------------
      if(this.algorithm2 === "BFS") {
        this.algoExecuting = true;
        [visit2, path2]=BFS(this.state.grid,beginNode2,endNode, 2);
      }

      else if(this.algorithm2 === "DFS") {
        this.algoExecuting = true;
        [visit2, path2]=DFSreturntemp(tempgrid,beginNode2,endNode, 2);
        
      }

      else if(this.algorithm2 === "BFS") {
        this.algoExecuting = true;
        [visit2, path2]=BFS(this.state.grid,beginNode2,endNode, 2);
      }

      else if(this.algorithm2 === "AS") {
        this.algoExecuting = true;
        [visit2, path2]=AStar(this.state.grid,beginNode2,endNode, 2);
        path2 = path2.reverse();
      }

      else if(this.algorithm2 === "GBFS") {
        this.algoExecuting = true;
        [visit2, path2]=GBFS(this.state.grid,beginNode2,endNode, 2);
        path2 = path2.reverse();
      }

      else if(this.algorithm2 === "UCS") {
        this.algoExecuting = true;
        [visit2, path2]=UCS(this.state.grid,beginNode2,endNode, 2);
        path2 = path2.reverse();
      }

      let tempvisit1 = [], tempvisit2 = [];
      for(let i = 0;i<visit1.length;++i) {
        if(visit1[i]!==-1) {
          tempvisit1.push(visit1[i]);
        }
      }

      for(let i = 0;i<visit2.length;++i) {
        if(visit2[i]!==-1) {
          tempvisit2.push(visit2[i]);
        }
      }

      visit1 = tempvisit1;
      visit2 = tempvisit2;
      let len1, len2;
      for(let i = 0;i<visit1.length;++i) {
        if(visit1[i][0] === this.endNode.Y && visit1[i][1] === this.endNode.X) {
          len1 = i;
        }
      }

      for(let i = 0;i<visit2.length;++i) {
        if(visit2[i][0] === this.endNode.Y && visit2[i][1] === this.endNode.X) {
          len2 = i;
        }
      }

      // console.log(len1,len2,"yaay");
      if(len1 < len2) {
        let traversalTime = 0;
        for(let i = 0;i<len1;++i) {
          setTimeout(() => {
            let node = visit1[i];
            if(node!==undefined){
              document.getElementById(`${node[0]}_${node[1]}`).className = 'animate';
            }
            
          },10*i);

          setTimeout(() => {
            let node = visit2[i];
            if(node!==undefined){
              document.getElementById(`${node[0]}_${node[1]}`).className = 'animate1';
            }
            
          },10*i);
          traversalTime = 10*i;
        }

        for(let i = 0;i<path1.length;++i) {
          setTimeout(() => {
            let node = path1[i];
            if(node!==undefined) {
              document.getElementById(`${node[0]}_${node[1]}`).className = 'path';
            }
            
          },traversalTime + 50 + 50*(i+1));
        }
      }
      else {
        let traversalTime = 0;
        for(let i = 0;i<len2;++i) {
          setTimeout(() => {
            let node = visit1[i];
            if(node!==undefined) {
              document.getElementById(`${node[0]}_${node[1]}`).className = 'animate';
            }
            
          },10*i);

          setTimeout(() => {
            let node = visit2[i];
            if(node!==undefined) {
              document.getElementById(`${node[0]}_${node[1]}`).className = 'animate1';
            }
            
          },10*i);
          traversalTime = 10*i;
        }

        for(let i = 0;i<path2.length;++i) {
          setTimeout(() => {
            let node = path2[i];
            if(node!==undefined) {
              document.getElementById(`${node[0]}_${node[1]}`).className = 'path';
            }
            
          },traversalTime + 50 + 50*(i+1));
        }
      }
      this.algoExecuting = false;

    }

    render(){
        return(
            <>
              <NavBar
                setAlgoName = {this.setAlgoName}
                visualize = {this.visualize}
                setMaze = {this.setMaze}
                activateDual = {this.activateDual}
                dualVisualize = {this.dualVisualize}
              />
              <div className = "temp"></div>{/* For spacing lel */}
              <Grid 
                grid = {this.state.grid}
                rows = {this.rows}
                cols = {this.cols}
                myMouseClick = {this.myMouseClick}
                myMouseEnter = {this.myMouseEnter}
                myMouseDown = {this.myMouseDown}
                myMouseUp = {this.myMouseUp}
                
              />

            </>    
        );
    }
}





export default PathFindViz;

