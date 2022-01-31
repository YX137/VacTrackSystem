import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

import { clearSubmissionStatus, submitNewHospital, loadHospitalList } from '../../state/hospital'

export function NewHospital (props) {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [currentInfo, setCurrentInfo] = useState({
        name: "",
        type: "public",
        charges: 0,
        address: "",
        remark: ""
    })
    let [valid, setValid] = useState(false)
    let [showPopUp, setShowPopUp] = useState(false)
    const submission = useSelector(state => state.hospital.submission)
    let handleSubmit = (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            setValid(true)
            dispatch(submitNewHospital(currentInfo))
            setShowPopUp(true)
        } else {
            event.stopPropagation();
        }
    }
    let handleClosePopUp = () => {
        if (submission.result) {
            dispatch(clearSubmissionStatus())
            navigate("/admin")
        } else {
            setShowPopUp(false)
        }
    }
    return <main>
        <h1>Add new hospital</h1>
        <Modal show={showPopUp} onHide={handleClosePopUp}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {submission.result === true ? "Success" : "Error"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {submission.result === true ? `New hospital has been submitted to the system. 
                Patients are now able to schedule appointments for receiving this hospital.` :
                    `Error occured while submitting new hospital to the system. Details:\n ${submission.feedback}`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClosePopUp}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <Form validated={valid} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} className="md-3" controlId="hospitalName">
                    <Form.Label>Name</Form.Label>
                    <Form.Text className="text-muted">
                        The name of the hospital
                    </Form.Text>
                    <Form.Control required type="text" placeholder="Hospital Name"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, name: event.target.value })} />
                    <Form.Control.Feedback type="invalid">
                        Uh
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="hospitalType">
                    <Form.Label>Type</Form.Label>
                    <Form.Text className="text-muted">
                        The type of the hospital, i.e. public vs private.
                    </Form.Text>
                    <Form.Check inline label="Public" name="hospitalTypeGroup" type="radio" id="public"/>
                    <Form.Check inline label="Private" name="hospitalTypeGroup" type="radio" id="private"/>
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="hospitalCost">
                    <Form.Label>Cost</Form.Label>
                    <Form.Text className="text-muted">
                        The subtotal to have vaccination there.
                    </Form.Text>
                    <Form.Control required type="number" placeholder="Total price"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, charges: parseInt(event.target.value) })} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="hospitalSideEffect">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address to the hospital"
                    onChange={(event) => setCurrentInfo({ ...currentInfo, address: event.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="hospitalRemark">
                <Form.Label>Other Information</Form.Label>
                <Form.Control as="textarea" rows={6}
                    placeholder="Enter here any information of concern here regarding this hospital."
                    onChange={(event) => setCurrentInfo({ ...currentInfo, remark: event.target.value })} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </main>
}

export function HospitalList (props) {
    let dispatch = useDispatch()
    useEffect(() => dispatch(loadHospitalList()), [])
    let list = useSelector(state => state.hospital.list)
    return <main>
        You can view all existing hospitals in the system here.
        <ListGroup variant='flush'>
            {list.sort((a, b) => a.name.localeCompare(b.name)).map(h => <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div>
                    <div><strong>{h.name}</strong></div>
                    <div>Cost: {h.charges}</div>
                    <div>Address: {h.address}</div>
                </div>
                <Badge variant="primary" text='light' pill>{h.type}</Badge>
            </ListGroup.Item>)}
        </ListGroup>
    </main>
}