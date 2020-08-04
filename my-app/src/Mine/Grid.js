import React from 'react';
import './Node.css'

class Node extends React.Component{
    render(){

        // const {
        //     id,
        //     myclass
        // } = this.props;

        return(
            <div
                id={this.props.nodeId}
                className = {this.props.class}></div>
        );
    }
}


class Grid extends React.Component{
    render() {

        const {
            grid,
            rows,
            cols
        } = this.props;
        console.log(this.props)
        let arrayOfNodes = []
        for(var i = 0;i<rows;i++) {
            
            for(var j = 0;j<cols;j++) {
                let nodeId = i + "_" + j
                let type = getNodeType(grid,i,j);
                // let type = "empty"
                arrayOfNodes.push(
                    <Node
                        nodeId = {nodeId}
                        key = {nodeId}
                        class = {type}
                    />
                )
            }
            console.log("entered",i,rows);
            
        }
        return(
            <div style = {{width:"1250px", marginLeft : "17%"}}>
                {arrayOfNodes}
            </div>
           
        );

        
    }

}

const getNodeType = (grid,i,j) => {
    if(grid[i][j] === 0){
        return "empty";
    }
    else if(grid[i][j] === 1){
        return "start";
    }
    else if(grid[i][j] === 2){
        return "end";
    }
    else if(grid[i][j] === 3){
        return "wall";
    }
    

}

export default Grid;