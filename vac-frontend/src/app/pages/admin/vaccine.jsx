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

import { clearSubmissionStatus, submitNewVaccine, loadVaccineList } from '../../state/vaccine'

export function NewVaccine(props) {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [currentInfo, setCurrentInfo] = useState({
        name: "",
        type: "mRNA",
        doses: -1,
        origin: "",
        price: "",
        sideEffects: "",
        remark: ""
    })
    let [valid, setValid] = useState(false)
    let [showPopUp, setShowPopUp] = useState(false)
    const submission = useSelector(state => state.vaccine.submission)
    let handleSubmit = (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            setValid(true)
            dispatch(submitNewVaccine(currentInfo))
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
        <h1>Add new vaccine</h1>
        <Modal show={showPopUp} onHide={handleClosePopUp}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {submission.result === true ? "Success" : "Error"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {submission.result === true ? `New vaccine has been submitted to the system. 
                Patients are now able to schedule appointments for receiving this vaccine.` :
                    `Error occured while submitting new vaccine to the system. Details:\n ${submission.feedback}`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClosePopUp}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <Form validated={valid} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} className="md-3" controlId="vaccineName">
                    <Form.Label>Name</Form.Label>
                    <Form.Text className="text-muted">
                        The name of the vaccine
                    </Form.Text>
                    <Form.Control required type="text" placeholder="Vaccine Name"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, name: event.target.value })} />
                    <Form.Control.Feedback type="invalid">
                        Uh
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="vaccineType">
                    <Form.Label>Type</Form.Label>
                    <Form.Text className="text-muted">
                        The type of the vaccine, e.g. mRNA, Adenovirus Vector, Inactivaed Virus, Subunit.
                    </Form.Text>
                    <Form.Select required type="text" placeholder="Vaccine Type"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, type: event.target.value })}>
                        <option value="mRNA">mRNA</option>
                        <option value="Adenovirus Vector">Adenovirus Vector</option>
                        <option value="Inactived Virus">Inactived Virus</option>
                        <option value="Subunit">Subunit</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="vaccineDoses">
                    <Form.Label>Doses Required</Form.Label>
                    <Form.Control required type="number" placeholder="Number of doses to complete the vaccination"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, doses: parseInt(event.target.value) })} />
                </Form.Group>
            </Row>

            <Row className="mb-2">
                <Form.Group as={Col} className="md-3" controlId="vaccineOrigin">
                    <Form.Label>Origin</Form.Label>
                    <Form.Text className="text-muted">
                        The name of the vendor/provider of this vaccine
                    </Form.Text>
                    <Form.Control required type="text" placeholder="Name of vaccine vendor/provider"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, origin: event.target.value })} />
                </Form.Group>
                <Form.Group as={Col} className="md-3" controlId="vaccinePrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Text className="text-muted">
                        Unit price of the vaccine.
                    </Form.Text>
                    <Form.Control required type="number" placeholder='Free of charge?'
                        onChange={(event) => setCurrentInfo({ ...currentInfo, price: event.target.value })} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="vaccineSideEffect">
                <Form.Label>Side Effect</Form.Label>
                <Form.Control type="text" placeholder="List of side effects known"
                    onChange={(event) => setCurrentInfo({ ...currentInfo, sideEffects: event.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="vaccineRemark">
                <Form.Label>Other Information</Form.Label>
                <Form.Control as="textarea" rows={6}
                    placeholder="Enter here any information of concern here regarding this vaccine."
                    onChange={(event) => setCurrentInfo({ ...currentInfo, remark: event.target.value })} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </main>
}

export function VaccineList(props) {
    let dispatch = useDispatch()
    useEffect(() => dispatch(loadVaccineList()), [])
    let list = useSelector(state => state.vaccine.list)
    return <main>
        You can view all existing vaccine in the system here.
        <ListGroup variant='flush'>
            {list.sort((a, b) => a.name.localeCompare(b.name)).map(v => <ListGroup.Item key={v._id} className="d-flex justify-content-between align-items-start">
                <div>
                    <div><strong>{v.name}</strong></div>
                    <div>Produced by {v.origin}</div>
                    <div>Type: {v.type}</div>
                </div>
                <Badge variant="primary" text='light' pill>Doses required: {v.doses}</Badge>
            </ListGroup.Item>)}
        </ListGroup>
    </main>
}