let INITIAL_STATE = {
    list: [],
    submission: {
        result: null,
        feedback: ""
    }
}

export default function VaccinesReducer(prev = INITIAL_STATE, action) {
    switch (action.type) {
        case 'Vaccine.Submission.Leave':
            return { ...prev, submission: { result: null, feedback: "" } }
        case 'Vaccine.Submission.Success':
            return { ...prev, submission: { result: true, feedback: "" } }
        case 'Vaccine.Submission.Failure':
            return { ...prev, submission: { result: false, feedback: action.payload } }
        case 'Vaccine.List.Success':
            return { ...prev, list: action.payload || [] }
        default:
            return prev
    }
}

export function clearSubmissionStatus() {
    // my feel when deliberatly use async-callback style
    return function (dispatch, getState) {
        dispatch({
            type: 'Vaccine.Submission.Leave'
        })
    }
}

export function submitNewVaccine(vacInfo) {
    return function (dispatch, getState) {
        window.fetch('http://localhost:8080/api/vaccine', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vacInfo)
        }).then(resp => resp.json()).then(result => {
            if (result.error) {
                dispatch({
                    type: 'Vaccine.Submission.Failure',
                    payload: result.error
                })
            } else {
                dispatch({
                    type: 'Vaccine.Submission.Success'
                })
            }
        })
    }
}

export function loadVaccineList() {
    return function (dispatch, getState) {
        window.fetch('http://localhost:8080/api/vaccine').then(resp => resp.json()).then(result => {
            if (result.error) {
                dispatch({
                    type: 'Vaccine.List.Failure',
                    payload: result.error
                })
            } else {
                dispatch({
                    type: 'Vaccine.List.Success',
                    payload: result.vaccines
                })
            }
        })
    }
}