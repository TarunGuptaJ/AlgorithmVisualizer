import React from 'react';
import './PathFindViz.css';
import NavBar from './NavBar'

import Node from './Node'

class PathFindViz extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            grid:[]
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid});
    }

    render(){
        const {grid} = this.state;
        return(
            <>
            <div>
                <NavBar/>

            </div>
            <div className = "temp"></div>
            <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>    
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };


const createNode = (col,row) =>{
    return{
        col,
        row,
    };
};

export default PathFindViz;

