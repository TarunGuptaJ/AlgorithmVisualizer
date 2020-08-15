import React, { Component } from 'react'
// import {Button, Navbar, NavDropdown, Nav} from 'react-bootstrap'
import {Navbar, Button, NavDropdown, Nav} from 'react-bootstrap'

class NavBar extends Component{
    refresh =()=>{
        window.location.reload(false);
    }
    
    // Algorithms
    setBFS =()=> {
        this.props.setAlgoName("BFS");
    }

    setDFS =()=> {
        this.props.setAlgoName("DFS");
    }

    setDJ =()=> {
        this.props.setAlgoName("DJ");
    }

    // Mazes
    setMaze1 =()=> {
        this.props.setMaze("M1");
    }

    setMaze2 =()=> {
        this.props.setMaze("M2");
    }

    setMaze3 =()=> {
        this.props.setMaze("M3");
    }

    visualize =()=> {
        this.props.visualize();
    }


    render(){
         
        return(
            <Navbar bg="dark" expand="lg" variant = "dark">
                <Navbar.Brand href="#home">Algorithm Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                    <NavDropdown title="Mazes" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick = {this.setMaze1}>Maze1</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setMaze2}>Maze2</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setMaze3}>Maze3</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick = {this.setBFS}>BFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDFS}>DFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDJ}>Djikstras</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant = "dark" onClick = {this.visualize}>Visualize</Button>
                    <Button variant = "dark" href="#Clear" onClick = {this.refresh}>Clear</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        )
    }
}

export default NavBar;