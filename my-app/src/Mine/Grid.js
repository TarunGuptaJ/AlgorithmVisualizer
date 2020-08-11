import React from 'react';
import './Grid.css'
// aaaabcdefbbbbad bad
// aaaabb
// aaaabad
class Node extends React.Component{
    mmc = () =>{
        this.props.myMouseClick(this.props.row,this.props.col);
    }

    mmd = () =>{
        this.props.myMouseDown(this.props.row,this.props.col);
    }

    mmu = () =>{
        this.props.myMouseUp();
    }

    mme = () =>{
        this.props.myMouseEnter(this.props.row,this.props.col);
    }

    render(){

        

        return(
            <div
                id={this.props.nodeId}
                className = {this.props.class}
                onClick = {this.mmc}
                onMouseDown = {this.mmd} 
                onMouseEnter = {this.mme}
                onMouseUp = {this.mmu}> 
                
            </div>
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
        // console.log(this.props)
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
                        row = {i}
                        col = {j}
                        myMouseClick = {this.props.myMouseClick}
                        myMouseEnter = {this.props.myMouseEnter}
                        myMouseDown = {this.props.myMouseDown}
                        myMouseUp = {this.props.myMouseUp}
                    />
                )
            }
            // console.log("entered",i,rows);
            
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
    else if(grid[i][j] === 5){
        return "animate";
    }

}

export default Grid;