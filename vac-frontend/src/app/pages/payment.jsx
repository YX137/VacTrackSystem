import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import { updateAppointment } from '../state/vaccination'

import QRCode from 'qrcode'

export default function PaymentPage(props) {
    let [showPopUp, setShowPopUp] = useState(false)
    let currentAppointment = useSelector(state => state.vaccination.current)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    useEffect(() => {
        if (currentAppointment.status !== 'processing') {
            console.log('Wrong appointment state, expected "processing", got', currentAppointment.status)
            navigate('/my/')
        }
        QRCode.toCanvas(document.getElementById('payment-qr-code'), 'lorem ipsum dora sit amet', 
            (err) => console.log('Error while generating QR Code', err))
    }, [])
    let handleClick = (event) => {
        event.preventDefault()
        // Client asks to update statue eww
        dispatch(updateAppointment(currentAppointment._id, 'scheduled'))
        setShowPopUp(true)
    }
    let handleClosePopUp = () => {
        if (currentAppointment.status === 'scheduled') {
            navigate("/my/")
        } else {
            setShowPopUp(false)
        }
    }
    return <main>
        <h1>Make a payment</h1>
        <Modal show={showPopUp} onHide={handleClosePopUp}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {currentAppointment.status === 'scheduled' ? "Success" : "Error" }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentAppointment.status === 'scheduled' ? `Payment received. You will need to show up at the scheduled time.` :
                    `Error occured while processing the payment. Please try again.`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClosePopUp}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        <div>
        <span>
        Scan the QR code to proceed to the payment. 
        Once you have finished, the page will automatically continue.
        </span>
        </div>
        <canvas id="payment-qr-code"></canvas>
        <div>
            <Button onClick={handleClick}>If you have done the payment, but nothing happens, click this</Button>
        </div>  
    </main>
}