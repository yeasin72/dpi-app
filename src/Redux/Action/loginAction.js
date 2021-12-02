import axios from "axios"
import { HIDE_ERROR, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Const/const"
const api = 'https://dpi-backend.herokuapp.com'

export const userLogin = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        
        const logReq = await axios.post(`${api}/auth/local`, formdata)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: logReq,
        })
    } catch (error) {
        console.clear();
        dispatch({
            type: LOGIN_FAILED,
            payload: error && error.response.data,
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_ERROR,
            })
        }, 6000);
    }
}