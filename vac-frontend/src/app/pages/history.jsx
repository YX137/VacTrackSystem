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

import { loadAppointmentList } from '../state/vaccination'

function mapStatusToBadgeVariant(status) {
    switch (status) {
        case 'processing': return 'info'
        case 'scheduled': return 'primary'
        case 'approved': return 'success'
        default: return 'dark'
    }
}

export default function AppointmentHistoyList (props) {
    let currentUser = useSelector(state => state.user)
    let dispatch = useDispatch()
    useEffect(() => dispatch(loadAppointmentList(currentUser._id)), [])
    let list = useSelector(state => state.vaccination.list)
    return <main>
        You can view all of your past appointments here.
        <ListGroup variant='flush'>
            {list.sort((a, b) => new Date(b) - new Date(a)).map(a => <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div>
                    <div>Date: {new Date(a.appointment).toLocaleString("en-US")}</div>
                    <div>Hospital: {a.hospital}</div>
                    <div>Vaccine: {a.vaccine}</div>
                </div>
                <Badge bg={mapStatusToBadgeVariant(a.status)} text='light' pill>{a.status}</Badge>
            </ListGroup.Item>)}
        </ListGroup>
    </main>
}