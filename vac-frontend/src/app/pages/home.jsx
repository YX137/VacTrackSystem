import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { useNavigate, Link } from "react-router-dom"

export default function Home (props) {
    let currentUser = useSelector(state => state.user)
    let navigate = useNavigate()
    useEffect(() => {
        if (currentUser.admin) {
            navigate("/admin/")
        }
    }, [])
    return <main>
        <Row>
            <Col md="8">
                <h1>Welcome back, valuable patient {currentUser.user}</h1>
            </Col>
            <Col>
                <ButtonGroup vertical style={{ float: "right" }}>
                    <Button as={Link} to="/my/appointment/new">Schedule new vaccination appointment</Button>
                    <Button as={Link} to="/my/appointment/">View past vaccination appointment</Button>
                </ButtonGroup>
            </Col>
        </Row>
    </main>
}