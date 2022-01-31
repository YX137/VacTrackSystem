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

import { updateAppointment, loadAllAppointments } from '../../state/vaccination'


function mapStatusToBadgeVariant(status) {
    switch (status) {
        case 'processing': return 'info'
        case 'scheduled': return 'primary'
        case 'approved': return 'success'
        default: return 'dark'
    }
}

export default function AppointmentList(props) {
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadAllAppointments())
    }, [])
    let list = useSelector(state => state.vaccination.adminList)
    let userList = useSelector(state => state.user.adminList)
    let handleClick = (appId) => (event) => {
        //event.preventDefault()
        dispatch(updateAppointment(appId, 'approved', true))
    }
    return <main>
        You can view all vaccination appointments here.
        <ListGroup variant='flush'>
            {list.sort((a, b) => new Date(b.appointment) - new Date(a.appointment)).map(a => <ListGroup.Item key={a._id} className="d-flex justify-content-between align-items-start">
                <div>
                    <div>Patient: {userList.get(a.user).name}</div>
                    <div>Scheduled Date: {new Date(a.appointment).toLocaleString("en-US")}</div>
                    <div>Scheduled hospital: {a.hospital}</div>
                    <div>Vaccine type: {a.vaccine}</div>
                    { a.status !== 'approved' ? <Button onClick={handleClick(a._id)}>Click to mark this vaccination as completed</Button> : <></>}
                </div>
                <Badge bg={mapStatusToBadgeVariant(a.status)} text='light' pill>Status: {a.status}</Badge>
            </ListGroup.Item>)}
        </ListGroup>
    </main>
}