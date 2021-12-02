import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator'
import { userLogin } from '../../../Redux/Action/loginAction';
import ReactLoading from 'react-loading';


const Login = () => {
    const dispatch = useDispatch()
    const [errmsg, seterrmsg] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    //  ==> Login data from server <==
    const userLoginstatus = useSelector(state => state.userLoginstatus)
    const { loading, loggedIn, error } = userLoginstatus

    //  ==> if login success <==
    if (loggedIn) {
        localStorage.setItem("usertoken", loggedIn.jwt)
        window.location.reload();
    }


    // ==> input data handle <==
    const emailHandler = (e) => setemail(e)
    const passwordHandler = (e) => setpassword(e)

    // ==> Login Action <==
    const loginRequest = () => {
        if (validator.isEmail(email)) {
            const formdata = {
                "identifier": email,
                "password": password
            }
            dispatch(userLogin(formdata))
        }// ==> if email not valid <==
        else{
            seterrmsg(true)
            setTimeout(() => {
                seterrmsg(false)
            }, 6000);
        }
    }

    return (
        <div className="login-form">
            <div className="form">
                <div className="form-item">
                    <input type="email" name="email" onChange={(e) => emailHandler(e.target.value)} />
                </div>
                <div className="form-item">
                    <input type="password" name="password" onChange={(e) => passwordHandler(e.target.value)} />
                </div>
                <div className="form-item">
                    <button onClick={loginRequest}>Login</button>
                </div>
            </div>
            {errmsg && 
            <div className="error-tosat">
                <p>Invalid Email Address</p>
            </div>
            }
            {error && 
            <div className="error-tosat">
                <p>{error}</p>
            </div>
            }
            {loading && 
            <div className="loading">
                <ReactLoading type={'cylon'} color={'#273c75'} />
            </div>
            }
        </div>
    )
}

export default Login
