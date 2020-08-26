import React, { Component } from 'react'
// import {Button, Navbar, NavDropdown, Nav} from 'react-bootstrap'
import {Navbar, Button, NavDropdown, Nav} from 'react-bootstrap'

class NavBar extends Component{
    refresh =()=>{
        window.location.reload(false);
    }
    
    // Algorithms
    setBFS =()=> {
        this.props.setAlgoName("BFS",0);
    }

    setDFS =()=> {
        this.props.setAlgoName("DFS",0);
    }

    setDJ =()=> {
        // Since it is a unweighted implementation (BFS and Djikstras are same)
        this.props.setAlgoName("BFS",0);
    }

    setAS =()=> {
        this.props.setAlgoName("AS",0);
    }

    setGBFS =()=> {
        this.props.setAlgoName("GBFS",0);
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

    // Dual Algorithm 1
    setBFS1 =()=> {
        this.props.setAlgoName("BFS",1);
    }

    setDFS1 =()=> {
        this.props.setAlgoName("DFS",1);
    }

    setDJ1 =()=> {
        // Since it is a unweighted implementation (BFS and Djikstras are same)
        this.props.setAlgoName("BFS",1);
    }

    setAS1 =()=> {
        this.props.setAlgoName("AS",1);
    }

    setGBFS1 =()=> {
        this.props.setAlgoName("GBFS",1);
    }

    // Dual Algorithm 2
    setBFS2 =()=> {
        this.props.setAlgoName("BFS",2);
    }

    setDFS2 =()=> {
        this.props.setAlgoName("DFS",2);
    }

    setDJ2 =()=> {
        // Since it is a unweighted implementation (BFS and Djikstras are same)
        this.props.setAlgoName("BFS",2);
    }

    setAS2 =()=> {
        this.props.setAlgoName("AS",2);
    }

    setGBFS2 =()=> {
        this.props.setAlgoName("GBFS",2);
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
                        <NavDropdown.Item onClick = {this.setBFS1}>BFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDFS1}>DFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDJ1}>Djikstras</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setAS1}>A*</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setGBFS1}>Greedy BFS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
            
                    <NavDropdown title="Algorithm 2" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick = {this.setBFS2}>BFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDFS2}>DFS</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setDJ2}>Djikstras</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setAS2}>A*</NavDropdown.Item>
                        <NavDropdown.Item onClick = {this.setGBFS2}>Greedy BFS</NavDropdown.Item>
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