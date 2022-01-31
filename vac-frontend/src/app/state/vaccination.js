let INITIAL_STATE = {
    current: {
        _id: null,
        user: null,
        hospital: null,
        vaccine: null,
        appointment: null,
        status: null,
    },
    list: [],
    adminList: []
}

export default function VaccinationReducer(prev = INITIAL_STATE, action) {
    switch (action.type) {
        case 'User.Appointment.New.Success':
        case 'User.Appointment.Update.Success':
            return { ...prev, current: action.payload }
        case 'User.Appointment.New.Error':
        case 'User.Appointment.Update.Error':
        case 'Admin.Appointment.Update.Error':
            return { ...prev, error: action.payload }
        case 'User.Appointment.List':
            return { ...prev, list: action.payload }
        case 'Admin.Appointment.List':
            return { ...prev, adminList: action.payload }
        case 'Admin.Appointment.Update.Success':
            let updated = { ...prev }
            for (let app in updated.adminList) {
                if (app._id === action.payload._id) {
                    app.status = action.payload.status
                }
            }
            return updated
        default:
            return prev
    }
}

export function createAppointment(uid, hospital, vaccine, dateTime, callback) {
    return function(dispatch, getState) {
        window.fetch(`http://localhost:8080/api/user/${uid}/vaccination`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hospital, vaccine, dateTime })
        }).then(resp => resp.json()).then(result => {
            console.log(result)
            if (result.error) {
                dispatch({
                    type: "User.Appointment.New.Error",
                    payload: result.error
                })
            } else {
                dispatch({
                    type: "User.Appointment.New.Success",
                    payload: result.vaccination
                })
                callback()
            }
        })
    }
}

export function updateAppointment(vid, status, admin = false) {
    return function(dispatch, getState) {
        window.fetch("http://localhost:8080/api/vaccination/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vaccination: { _id: vid, status } })
        }).then(resp => resp.json()).then(result => {
            if (result.error) {
                dispatch({
                    type: admin ? "Admin.Appointment.Update.Error" : "User.Appointment.Update.Error",
                    payload: result.error
                })
            } else {
                dispatch({
                    type: admin ? "Admin.Appointment.Update.Success" : "User.Appointment.Update.Success",
                    payload: result.vaccination
                })
            }
        })
    }
}

export function loadAllAppointments() {
    return function(dispatch, getState) {
        window.fetch(`http://localhost:8080/api/vaccination/`)
            .then(resp => resp.json())
            .then(result => {
                if (result.vaccinations && result.vaccinations.length > 0) {
                    dispatch({
                        type: "Admin.Appointment.List",
                        payload: result.vaccinations
                    })
                }
            })
    }
}

export function loadAppointmentList(uid) {
    return function(dispatch, getState) {
        window.fetch(`http://localhost:8080/api/user/${uid}/vaccination/`)
            .then(resp => resp.json())
            .then(result => {
                if (result.vaccinations && result.vaccinations.length > 0) {
                    dispatch({
                        type: "User.Appointment.List",
                        payload: result.vaccinations
                    })
                }
            })
    }
}