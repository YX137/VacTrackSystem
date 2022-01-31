let INITIAL_STATE = {
    list: [],
    submission: {
        result: null,
        feedback: ""
    }
}

export default function HospitalsReducer(prev = INITIAL_STATE, action) {
    switch (action.type) {
        case 'Hospital.Submission.Leave':
            return { ...prev, submission: { result: null, feedback: "" } }
        case 'Hospital.Submission.Success':
            return { ...prev, submission: { result: true, feedback: "" } }
        case 'Hospital.Submission.Failure':
            return { ...prev, submission: { result: false, feedback: action.payload } }
        case 'Hospital.List.Success':
            return { ...prev, list: action.payload || [] }
        default:
            return prev
    }
}

export function clearSubmissionStatus() {
    // my feel when deliberatly use async-callback style
    return function (dispatch, getState) {
        dispatch({
            type: 'Hospital.Submission.Leave'
        })
    }
}

export function submitNewHospital(hospitalInfo) {
    return function (dispatch, getState) {
        window.fetch('http://localhost:8080/api/hospital', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hospitalInfo)
        }).then(resp => resp.json()).then(result => {
            if (result.error) {
                dispatch({
                    type: 'Hospital.Submission.Failure',
                    payload: result.error
                })
            } else {
                dispatch({
                    type: 'Hospital.Submission.Success'
                })
            }
        })
    }
}

export function loadHospitalList() {
    return function (dispatch, getState) {
        window.fetch('http://localhost:8080/api/hospital').then(resp => resp.json()).then(result => {
            if (result.error) {
                dispatch({
                    type: 'Hospital.List.Failure',
                    payload: result.error
                })
            } else {
                dispatch({
                    type: 'Hospital.List.Success',
                    payload: result.hospitals
                })
            }
        })
    }
}