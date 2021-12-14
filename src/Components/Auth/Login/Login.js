import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator'
import { userLogin } from '../../../Redux/Action/loginAction';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './Login.css';


const Login = () => {
    const dispatch = useDispatch()
    const [errmsg, seterrmsg] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    //  ==> Login data from server <==
    const userLoginstatus = useSelector(state => state.userLoginstatus)
    const { loading, loggedIn, error, success } = userLoginstatus

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
            <div className="animated-svg" style={{backgroundImage: `url("./img/log-bg.svg")`}}>
                <h2>svg</h2>
            </div>
            <div className="login-main">
                {loading ? 
                <div className="loading">
                    <ReactLoading type={'cylon'} color={'#273c75'} />
                </div>
                :
                <div className="form">
                    <div className="form-heading">
                        <h3>Log in</h3>
                    </div>
                    <div className="form-item">
                        <input type="email" name="email" placeholder='Email' onChange={(e) => emailHandler(e.target.value)} />
                    </div>
                    <div className="form-item">
                        <input type="password" placeholder='Password' name="password" onChange={(e) => passwordHandler(e.target.value)} />
                    </div>
                    <div className="form-item">
                        <button onClick={loginRequest}>Login</button>
                    </div>
                    <div className="form-item">
                        <p>New Here? <Link to="/register">Register</Link> </p>
                        
                    </div>
                </div>
                }
                {errmsg && 
                <div className="error-tosat">
                    <p><FontAwesomeIcon icon={faExclamationCircle} /> Invalid Email Address</p>
                </div>
                }
                {(error || success) && 
                <div className={error ? "error-tosat" : "success-toast"}>
                    <p>{error ? <>
                        <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                    </> : <>
                        <FontAwesomeIcon icon={faCheck} /> {success}
                    </>}</p>
                </div>
                }
                
            </div>
        </div>
    )
}

export default Login
