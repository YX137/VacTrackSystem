import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { loadVaccineList } from '../state/vaccine'
import { loadHospitalList } from '../state/hospital'
import { createAppointment } from '../state/vaccination'

import PaymentPage from "./payment"

export default function NewAppointment(props) {
    let currentUser = useSelector(state => state.user)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    useEffect(() => {
        if (currentUser.admin) {
            navigate("/admin/appointment")
        } else {
            dispatch(loadVaccineList())
            dispatch(loadHospitalList())
        }
    }, [])
    let [currentInfo, setCurrentInfo] = useState({
        hospital: null,
        vaccine: null,
        appointment: null
    })
    let [valid, setValid] = useState(false)
    let vaccineList = useSelector(state => state.vaccine.list)
    let hospitalList = useSelector(state => state.hospital.list)
    let [startPaying, setStartPaying] = useState(false)
    let handleSubmit = (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            /* alert(JSON.stringify(currentInfo)); */
            dispatch(createAppointment(currentUser._id, 
                currentInfo.hospital, 
                currentInfo.vaccine, 
                currentInfo.appointment,
                () => setStartPaying(true)))
            console.log('Start paying')
            setValid(true)
        } else {
            event.stopPropagation();
        }
    }
    if (startPaying) {
        return <PaymentPage />
    }
    return <main>
        <h1>Schedule a vaccination appointment</h1>
        <Form validated={valid} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} className="md-3" controlId="appointmentHospital">
                    <Form.Label>Hospital</Form.Label>
                    <Form.Text className="text-muted">
                        Select the hospital you would like to receive the vaccination.
                    </Form.Text>
                    <Form.Select required onChange={(event) => setCurrentInfo({ ...currentInfo, hospital: event.target.value })}>
                        {hospitalList.map(h => <option key={h.name} value={h.name}>{h.name}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="md-3" controlId="appointmentVaccine">
                    <Form.Label>Vaccine Brand</Form.Label>
                    <Form.Text className="text-muted">
                        Select the brand of vaccine you would like to receive.
                    </Form.Text>
                    <Form.Select required onChange={(event) => setCurrentInfo({ ...currentInfo, vaccine: event.target.value })}>
                        {vaccineList.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} className="md-3" controlId="appointmentDate">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Text className="text-muted">
                        Select the date when you would like to receive the vaccination.
                    </Form.Text>
                    <Form.Control required type="date" placeholder="Select the date you'd like to receive vaccination"
                        onChange={(event) => setCurrentInfo({ ...currentInfo, appointment: event.target.value })} />
                </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
                Click to go to the payment page to continue
            </Button>
        </Form>
    </main>
}