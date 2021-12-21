import { PROFILE_REQUEST, REGI_HIDE_ERROR, REGI_HIDE_SUCCESS_MESSAGE, REGI_FAILED, REGI_REQUEST, REGI_SUCCESS } from "../Const/const"



export const registationReducer = (state = { regi: null, status:null, regierror: null, success: null }, action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return { regiloading: true, regi: null, status:null, regierror: null, success: null }
        case REGI_REQUEST:
            return { regiloading: true, regi: null, status:null, regierror: null, success: null }
        case REGI_SUCCESS:
            return { regiloading: false, regi: action.payload.data, status:action.payload.status, success: 'You registation successfully done, wait for the approval', regierror: null  }
        case REGI_HIDE_SUCCESS_MESSAGE:
            return { regiloading: false, regi: action.payload.data, status:action.payload.status, regierror: null, success: null }
        case REGI_FAILED:
            return { regiloading: false,
                regierror: action.payload.message[0].messages[0].message,
                status:action.payload.statusCode, regi: null }
        case REGI_HIDE_ERROR:
            return { regiloading: false,
                regierror: null,
                status:null, regi: null }
        default:
            return state
    }
}