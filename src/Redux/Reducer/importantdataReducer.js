import { BASICDATA_FAILED, BASICDATA_REQUEST, BASICDATA_SUCCESS } from "../Const/const"



export const dipartmentReducer = (state = { settingsData: null, teacherTech: null, studentTech: null, error: null, }, action) => {
    switch (action.type) {
        case BASICDATA_REQUEST:
            return { loading: true, settingsData: null, teacherTech: null, studentTech: null, error: null, }
        case BASICDATA_SUCCESS:
            return { loading: false, settingsData: action.payload.settings, teacherTech: action.payload.teacher, studentTech:action.payload.student, error: null  }
        case BASICDATA_FAILED:
            return { loading: false,
                error: action.payload.message[0].messages[0].message, settingsData: null, teacherTech: null, studentTech: null,  }
        default:
            return state
    }
}