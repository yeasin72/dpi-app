import axios from "axios"
import { HIDE_ERROR, HIDE_SUCCESS_MESSAGE, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Const/const"
const api = 'https://dpi-backend.herokuapp.com'

export const userLogin = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        
        const logReq = await axios.post(`${api}/auth/local`, formdata)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: logReq,
        })
        setTimeout(() => {
            dispatch({
                type: HIDE_SUCCESS_MESSAGE,
                payload: logReq,
            })
        }, 4000);
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