import { HIDE_ERROR, HIDE_SUCCESS_MESSAGE, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Const/const"



export const loginReducer = (state = { loggedIn: null, status:null, error: null, success: null }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true, loggedIn: null, status:null, error: null, success: null }
        case LOGIN_SUCCESS:
            return { loading: false, loggedIn: action.payload.data, status:action.payload.status, success: 'successfully loggedin', error: null  }
        case HIDE_SUCCESS_MESSAGE:
            return { loading: false, loggedIn: action.payload.data, status:action.payload.status, error: null, success: null }
        case LOGIN_FAILED:
            return { loading: false,
                error: action.payload.message[0].messages[0].message,
                status:action.payload.statusCode, loggedIn: null }
        case HIDE_ERROR:
            return { loading: false,
                error: null,
                status:null, loggedIn: null }
        default:
            return state
    }
}