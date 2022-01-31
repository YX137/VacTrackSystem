import React, { Component } from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Redirect, Route, Link } from "react-router-dom";

import Header from "./pages/header";
import Home from "./pages/home";
import AdminHome from "./pages/admin/admin";
import Login from "./pages/login";
import Register from "./pages/register"
import { NewVaccine, VaccineList } from "./pages/admin/vaccine";
import { NewHospital, HospitalList } from "./pages/admin/hospital"
import NewAppointment from "./pages/appointment";
import AppointmentHistoyList from "./pages/history"
import AppointmentList from "./pages/admin/management"

let FrontPage = (props) => {
    let currentUser = useSelector(state => state.user)
    
    return currentUser._id ? <main>
        Welcome back, {currentUser.name}.
        <Link to="/my">Click here to go to your patient portal</Link>
    </main> : <main>
        Welcome to the vaccination record tracking system. Please login.
        <Link to='/login'>Login</Link>
    </main>
}

let Footer = React.memo((props) => <footer>
    <p>Test website please ignore</p>
    <p>&copy; 2022 Buzzfuzz Inc.</p>
</footer>)

let RequireLogin = (props) => {
    let currentUser = useSelector(state => state.user)
    return currentUser._id ? <>{props.children}</> : <main>
        You must login before access this page. 
        <a href="/login">Click here to login</a>
    </main>
}

export default class App extends Component {

    constructor(props, context) {
        super(props)
    }

    render() {
        return <Router>
            <Header />
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my/" element={<RequireLogin><Home/></RequireLogin>} />
                <Route path="/my/appointment" element={<RequireLogin><AppointmentHistoyList /></RequireLogin>} />
                <Route path="/my/appointment/new" element={<RequireLogin><NewAppointment/></RequireLogin>} />
                <Route path="/admin/" element={<RequireLogin><AdminHome /></RequireLogin>} />
                <Route path="/admin/vaccine" element={<RequireLogin><VaccineList /></RequireLogin>} />
                <Route path="/admin/hospital" element={<RequireLogin><HospitalList /></RequireLogin>} />
                <Route path="/admin/vaccine/new" element={<RequireLogin><NewVaccine /></RequireLogin>} />
                <Route path="/admin/hospital/new" element={<RequireLogin><NewHospital /></RequireLogin>} />
                <Route path="/admin/appointment" element={<RequireLogin><AppointmentList /></RequireLogin>} />
            </Routes>
            <Footer />
        </Router>
    }
}