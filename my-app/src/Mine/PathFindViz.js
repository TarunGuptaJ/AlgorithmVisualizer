import React from 'react';
import './PathFindViz.css';
import NavBar from './NavBar'

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

    // componentDidMount(){
    //     const grid = getInitialGrid();
    //     this.setState({grid});
    // }

    render(){
        // const {grid} = this.state;
        return(
            <>
              <NavBar/>
              <div className = "temp"></div>
              <div style = {{align :"center"}}>
              <Grid 
                grid = {this.state.grid}
                rows = {this.rows}
                cols = {this.cols}
              />
              </div>

            </>    
        );
    }
}





export default PathFindViz;

