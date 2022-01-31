let INITIAL_STATE = {
    _id: null,
    user: null,
    adminList: new Map()
}

export default function UserReducer (prev = INITIAL_STATE, action) {
    switch (action.type) {
        case "User.Login":
            return { ...action.payload, user: action.payload.name }
        case "User.Reg.Error":
        case "User.Login.Error":
            return { error: action.payload }
        case 'User.List.Success':
            let newlyFetchedList = action.payload.reduce((lookupTable, u) => lookupTable.set(u._id, u), new Map())
            return { ...prev, adminList: newlyFetchedList }
        case "User.Logout":
            return INITIAL_STATE
        default:
            return prev
    }
}

export function register(info) {
    console.log("Registration fired")
    return function(dispatch, getState) {
        window.fetch("http://localhost:8080/api/user/", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(resp => resp.json()).then(result => {
            if (result.error) {
                console.log("Error occured while register: ", result.error)
                dispatch({
                    type: "User.Reg.Error",
                    payload: result.error
                })
            } else {
                dispatch({
                    type: "User.Login",
                    payload: { ...result.user }
                })
            }
        })
    }
}

export function loginUser(userName, password) {
    return function(dispatch, getState) {
        window.fetch("http://localhost:8080/api/user/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password }) // Clear-text password ewww
        }).then(resp => resp.json()).then(result => {
            if (result.error) {
                //console.log("Error occured while login: ", result.error)
                dispatch({
                    type: "User.Login.Error",
                    payload: result.error
                })
            } else {
                dispatch({
                    type: "User.Login",
                    payload: { ...result.user }
                })
            }
        })
    }
}

export function logoutUser() {
    // You ask why I put this way?
    // Because in the future there would be an API call to server that actually do the logout.
    return function(dispatch, getState) {
        dispatch({
            type: "User.Logout"
        })
    }
}

export function loadAllUser() {
    return function(dispatch, getState) {
        window.fetch("http://localhost:8080/api/user/")
            .then(resp => resp.json())
            .then(result => {
                if (result.error) {
                    //console.log("Error occured while login: ", result.error)
                    dispatch({
                        type: "User.List.Error",
                        payload: result.error
                    })
                } else {
                    dispatch({
                        type: "User.List.Success",
                        payload: result.users
                    })
                }
            })
    }
}