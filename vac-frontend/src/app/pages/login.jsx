import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { loginUser } from "../state/user"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage(props) {

    let [userName, setUserName] = useState("guest")
    let [password, setPassword] = useState("")

    let onUserNameChanges = (event) => {
        setUserName(event.target.value)
        event.preventDefault()
    }
    let onPasswordChanges = (event) => {
        setPassword(event.target.value)
        event.preventDefault()
    }
    let dispatch = useDispatch()
    let onLogin = (event) => {
        event.preventDefault()
        dispatch(loginUser(userName, password))
    }

    let currentUser = useSelector(state => state.user)
    let navigate = useNavigate()
    useEffect(() => {
        if (currentUser._id) {
            navigate("/my/")
        }
    })
    
    return currentUser._id ? <main>You have already logged in. Redirecting... </main> : <main>
        <h1>Login</h1>
        If you don't have an account here yet, <a href="/register">click here to sign up for one</a>
        <Form onSubmit={onLogin}>
            <Form.Group className="mb-3" controlId="loginName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter user's name" onChange={onUserNameChanges} />
                <Form.Text className="text-muted">
                    Enter the name you provided to the staff when registered.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={onPasswordChanges} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    </main>
}