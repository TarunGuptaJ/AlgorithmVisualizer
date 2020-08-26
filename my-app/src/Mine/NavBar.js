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
        // Since it is a unweighted implementation (BFS and Djikstras are same)
        this.props.setAlgoName("BFS");
    }

    setAS =()=> {
        this.props.setAlgoName("AS");
    }

    setGBFS =()=> {
        this.props.setAlgoName("GBFS");
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

    // Dual
    activateDual =()=> {
        this.props.activateDual();
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
                        <NavDropdown.Item onClick = {this.setMaze1}>Maze 1</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setMaze2}>Maze 2</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setMaze3}>Maze 3</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick = {this.setBFS}>BFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDFS}>DFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDJ}>Djikstras</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setAS}>A*</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setGBFS}>Greedy BFS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant = "dark" onClick = {this.visualize}>Visualize</Button>
                    <Button variant = "dark" href="#Clear" onClick = {this.refresh}>Clear</Button>
                    {/* Dual Algorithm Visualizer */}
                    <Button variant = "dark" onClick = {this.activateDual} >Dual</Button>

                    <NavDropdown title="Algorithms 1" id="basic-nav-dropdown">
                        <NavDropdown.Item>BFS</NavDropdown.Item>
                        <NavDropdown.Item>DFS</NavDropdown.Item>
                        <NavDropdown.Item>Djikstras</NavDropdown.Item>
                        <NavDropdown.Item>A*</NavDropdown.Item>
                        <NavDropdown.Item>Greedy BFS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
            
                    <NavDropdown title="Algorithm 2" id="basic-nav-dropdown">
                        <NavDropdown.Item>BFS</NavDropdown.Item>
                        <NavDropdown.Item>DFS</NavDropdown.Item>
                        <NavDropdown.Item>Djikstras</NavDropdown.Item>
                        <NavDropdown.Item>A*</NavDropdown.Item>
                        <NavDropdown.Item>Greedy BFS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    
                
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        )
    }
}

export default NavBar;