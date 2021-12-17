import axios from "axios"
import { BASICDATA_FAILED, BASICDATA_REQUEST, BASICDATA_SUCCESS } from "../Const/const"
const api = 'https://dpi-backend.herokuapp.com'

export const getDipartment = () => async (dispatch) => {
    try {
        dispatch({ type: BASICDATA_REQUEST })
        
        const student = await axios.get(`${api}/student-technologies`)
        const teacher = await axios.get(`${api}/teacher-technologies`)
        const settings = await axios.get(`${api}/website-settings`)
        console.log("student", student);
        console.log("teacher", teacher);
        console.log("settings", settings);
        dispatch({
            type: BASICDATA_SUCCESS,
            payload: {
                student: student.data,
                teacher: teacher.data,
                settings: settings.data,
            },
        })
    } catch (error) {
        dispatch({
            type: BASICDATA_FAILED,
            payload: error && error.response.data,
        })

    }
}