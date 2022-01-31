import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import { loadAllUser } from '../../state/user'

export default function AdminHome (props) {
    let dispatch = useDispatch()
    let currentUser = useSelector(state => state.user)
    let navigate = useNavigate()
    useEffect(() => {
        if (!currentUser.admin) {
            navigate("/my/")
        }
        dispatch(loadAllUser())
    }, [])
    let data = {
        labels: [ 'Unprotected', 'Partially vaccinated', 'Fully vaccinated' ],
        datasets: [
            {
                data: [ 1, 1, 1 ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            }
        ]
    }
    return <main>
        <Row>
            <Col md="8">
                <h1>Welcome back, system staff {currentUser.user}</h1>
                Select one of the options in the panel on your right-hand-side to start.
                <div>
                    As of today, this is our vaccination progress for all tracking patients:
                    <Chart type='doughnut' data={data} style={{ scale: "0.75" }} />
                </div>
            </Col>
            <Col>
                <ButtonGroup vertical style={{ float: "right" }}>
                    <Button as={Link} to="/admin/vaccine/new">Add new vaccine</Button>
                    <Button as={Link} to="/admin/hospital/new">Add new hospital</Button>
                    <Button as={Link} to="/admin/vaccine">View vaccine list</Button>
                    <Button as={Link} to="/admin/hospital">View hospital list</Button>
                    <Button as={Link} to="/admin/appointment">View vaccination records</Button>
                </ButtonGroup>
            </Col>
        </Row>
    </main>
}