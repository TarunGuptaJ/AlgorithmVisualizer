import React from 'react';
import './PathFindViz.css';
import NavBar from './NavBar'
import BFS from './Algorithms/BFS'
import Grid from './Grid'

class PathFindViz extends React.Component{
    constructor(props){
        super(props);
        this.rows = 20;
        this.cols = 50;

        this.startNode = {
          X:10,Y:10
        }

        this.endNode = {
          X:10,Y:40
        }

        this.startMovable = false;
        this.endMovable = false;
        this.createWalls = false;

        this.algorithmName = "Nothing";

        this.algoExecuting = false;

        this.getInitialGrid = (rows,cols) => {
          var grid = new Array(rows);
          for (let i = 0; i < rows; ++i) {
              grid[i] = new Array(cols);
          }

          // console.log(this.endNode)

          for(let i = 0;i<rows;++i) {
            for(let j = 0;j<cols;++j) {
              if(i === this.startNode.X && j === this.startNode.Y){
                grid[i][j] = 1; // 1 for start node
              }

              else if(i === this.endNode.X && j === this.endNode.Y){
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
      else if(row === this.startNode.X && col === this.startNode.Y) {
        this.startMovable = true;
      }
      else if(row === this.endNode.X && col === this.endNode.Y) {
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
          temp[this.startNode.X][this.startNode.Y] = 0;
          this.startNode.X = row;
          this.startNode.Y = col;
          this.setState({
            grid:temp
          })
        }

        else if(this.endMovable) {
          let temp = this.state.grid; 
          temp[row][col] = 2;
          temp[this.endNode.X][this.endNode.Y] = 0;
          this.endNode.X = row;
          this.endNode.Y = col;
          this.setState({
            grid: temp
          })
        }

        // 0 empty, 1 start, 2 end, 3 wall
        else if(this.createWalls) {
          // TBD
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

    setAlgoName = (AlgoName) => {
      this.algorithmName = AlgoName;
      console.log(this.algorithmName);

    }

    animate(traversalNodes) {
      for(let i = 0;i<traversalNodes.length;++i) {

        setTimeout(() => {
          let node = traversalNodes[i];
          document.getElementById(`${node[0]}_${node[1]}`).className = 'animate';
        },10*i);
      }
      this.algorithmName = "Nothing";
      this.algoExecuting = false;
    }

    getBFScoords = () => {
      // const grid = this.state.grid;
      
      // Had to be reversed because left side top node is 0,0 so X and Y axis is inverted
      const beginNode = [this.startNode.Y,this.startNode.X];
      const endNode = [this.endNode.Y,this.endNode.X]; 
      console.log("inside");
      var BFStraveralNodes = BFS(this.state.grid,beginNode,endNode);
      // console.log(BFStraveralNodes);
      this.animate(BFStraveralNodes);
    }

    visualize = () =>{
      console.log("visualize");
      if(this.algoExecuting) {
        return;
      }
      
      if(this.algorithmName === "BFS") {
        this.algoExecuting = true;
        this.getBFScoords();// TBD
      }
    }

    render(){
        return(
            <>
              <NavBar
                setAlgoName = {this.setAlgoName}
                visualize = {this.visualize}
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

