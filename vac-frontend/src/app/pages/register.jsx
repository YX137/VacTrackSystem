import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { register } from "../state/user"

export default function Register(props) {
    let currentUser = useSelector(state => state.user)
    let navigate = useNavigate()
    useEffect(() => {
        if (currentUser._id) {
            navigate("/my/")
        }
    }, [])
    let [currentInfo, setCurrentInfo] = useState({
        name: "",
        password: "",
        age: -1,
        sex: "",
        address: "",
        contact: "",
        profession: "",
        medicalHistory: ""
    })
    let [valid, setValid] = useState(false)
    let dispatch = useDispatch()
    let handleSubmit = (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            /* alert(JSON.stringify(currentInfo)); */
            dispatch(register(currentInfo))
            setValid(true)
        } else {
            event.stopPropagation();
        }
    }
    return currentUser._id ? <main>You are already logged in. Redirecting...</main> : <main>
        <h1>Sign up for the system</h1>
        <Form validated={valid} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} className="md-3" controlId="registerName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" placeholder="Put your name here."
                        onChange={(event) => setCurrentInfo({ ...currentInfo, name: event.target.value })} />
                    <Form.Text className="text-muted">
                        You will then login to the system using this name.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Uh
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="registerAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control required type="number" placeholder="Your age"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, age: parseInt(event.target.value) })} />
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="registerSex">
                    <Form.Label>Sex</Form.Label>
                    <Form.Select required onChange={(event) => setCurrentInfo({ ...currentInfo, sex: event.target.value })}>
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row className="mb-2">
                <Form.Group as={Col} className="md-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Put a memorizable password here."
                        onChange={(event) => setCurrentInfo({ ...currentInfo, password: event.target.value })} />
                    <Form.Text className="text-muted">
                        You will then login to the system with this to prove that you are you.
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="registerPasswordRepeated">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control required type="password"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, repeatPassword: event.target.value })} />
                    <Form.Text className="text-muted">
                        Repeat the password you just typed.
                    </Form.Text>
                </Form.Group>
            </Row>


            <Form.Group className="mb-3" controlId="registerAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address"
                    onChange={(event) => setCurrentInfo({ ...currentInfo, address: event.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerProfession">
                <Form.Label>Profession</Form.Label>
                <Form.Control type="text" placeholder="Your current occupition"
                    onChange={(event) => setCurrentInfo({ ...currentInfo, profession: event.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerMedicalHistory">
                <Form.Label>Medical history</Form.Label>
                <Form.Control as="textarea" rows={6}
                    placeholder="If you have any medical history or other conditions, enter here so we can proceed with caution."
                    onChange={(event) => setCurrentInfo({ ...currentInfo, medicalHistory: event.target.value })} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Sign up
            </Button>
        </Form>
    </main>
}