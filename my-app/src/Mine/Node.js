import React from 'react';
import './Node.css'

class Node extends React.Component{
    render(){

        const {
            row,
            col,
        } = this.props;

        return(
            <div
                id={`node-${row}-${col}`}
                className = {`node`}
            />
        );
    }
}

export default Node;