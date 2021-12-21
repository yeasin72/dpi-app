import axios from "axios"
import {  PROFILE_REQUEST, REGI_HIDE_ERROR, REGI_HIDE_SUCCESS_MESSAGE, REGI_FAILED, REGI_REQUEST, REGI_SUCCESS } from "../Const/const"
const api = 'https://dpi-backend.herokuapp.com'

export const userRegistation = (formdata, profilepic) => async (dispatch) => {
    try {
        //  file upload
        dispatch({ type: PROFILE_REQUEST })
        const {data} = await axios({
            method: 'POST',
            url: `${api}/upload/`,
            data: profilepic
        })
        await dispatch({ type: REGI_REQUEST })
        // create profile
        const arrangedData = {...formdata, "Picture": data && data[0]}
        const userreg = await axios.post(`${api}/auth/local/register`, arrangedData)
        dispatch({
            type: REGI_SUCCESS,
            payload: userreg,
        })
        setTimeout(() => {
            dispatch({
                type: REGI_HIDE_SUCCESS_MESSAGE,
                payload: userreg,
            })
        }, 4000);
    } catch (error) {
        dispatch({
            type: REGI_FAILED,
            payload: error && error.response.data,
        })
        setTimeout(() => {
            dispatch({
                type: REGI_HIDE_ERROR,
            })
        }, 6000);
    }
}