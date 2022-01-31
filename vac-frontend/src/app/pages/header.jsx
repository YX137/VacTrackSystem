import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Header(props) {
    return <header>
        <Navbar>
            <Navbar.Brand as={Link} to="/">Vacciniation Tracking System</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Item as={Link} to="/my">Home</Nav.Item>
                <Nav.Item as={Link} to="/login">Login</Nav.Item>
            </Nav>
        </Navbar>
    </header>
}