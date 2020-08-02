import React, { Component } from 'react'
// import {Button, Navbar, NavDropdown, Nav} from 'react-bootstrap'
import {Navbar, Button, NavDropdown, Nav} from 'react-bootstrap'

class NavBar extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg" variant = "dark">
                <Navbar.Brand href="#home">Algorithm Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Nav>
                    <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <Button variant = "dark" href="#Visualize">Visualize</Button>
                    <Button variant = "dark" href="#Clear">Clear</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        )
    }
}

export default NavBar;