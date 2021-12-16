import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom'
import validator from 'validator'
import { userLogin } from '../../../Redux/Action/loginAction';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { faEye } from '@fortawesome/free-regular-svg-icons'
// import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import './../Login/Login.css';
import './Register.css'


const Register = () => {
    const dispatch = useDispatch()
    const [errmsg, seterrmsg] = useState(false)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [togglepass, settogglepass] = useState(false)
    const [techerORstudent, settecherORstudent] = useState(false)

    //  ==> Login data from server <==
    const userLoginstatus = useSelector(state => state.userLoginstatus)
    const { loading, loggedIn, error, success } = userLoginstatus

    //  ==> if login success <==
    if (loggedIn) {
        localStorage.setItem("usertoken", loggedIn.jwt)
        window.location.reload();
    }

    // ==> show/hide pass <== 
    function togglePassword() {
        settogglepass(!togglepass)
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

    //  teacher and student toggle
    function teacherAndStudentToggle(who){
        if (who === 'teacher') {
            settecherORstudent(true)
        }else{
            settecherORstudent(false)
        }
    }
    
    if ('a' === 1) {
        loginRequest()
        emailHandler()
        passwordHandler()
        togglePassword()
    }

    return (
        <div className="login-form" style={{background: `url("./img/background.svg")`}}>
            <div className="animated-svg" style={{background: `url("./img/mobile-bg.jpeg")`}}>
                <div className="overlay">
                    <div className="logo">
                        <img src="./img/logo-ani.svg" alt="logo" />
                    </div>
                </div>
            </div>
            <div className="container bring-top-for-mobile">
            <div className="login-main">
                {loading ? // ==> if login request is running <==
                <div className="loading">
                    <ReactLoading type={'cylon'} color={'#273c75'} />
                </div>
                :
                <div className="form">
                    {/* ==> student or teacher toggling <== */}
                    <div className='toggle-buttongroup'>
                        <div className="t-button">
                            <div className={techerORstudent? "t-active-left" :  "t-active-right"}></div>
                            <div className="teacher" onClick={() => teacherAndStudentToggle('teacher')}>Teacher</div>
                            <div className="student" onClick={() => teacherAndStudentToggle('student')}>Student</div>
                        </div>
                    </div>
                    {/* ==> registation form <== */}
                    <div className="registion-f">
                        <div className="form-heading">
                            <h3>{techerORstudent? 'Teacher' : 'Student'} Registation</h3>
                        </div>
                        <div className="r-form-item">
                            <input type="text" placeholder={techerORstudent? 'Teacher Name' : 'Student Name'} />
                        </div>
                        <div className="r-form-item">
                            <input type="email" placeholder='E-mail' />
                        </div>
                        <div className="r-form-item">
                            <input type="text" placeholder='Board Roll' />
                        </div>
                        <div className="r-form-item">
                            <input type="text" placeholder='Board Registation no' />
                        </div>
                    </div>
                </div>
                }
                {errmsg && // ==> if got error from validation <==
                <div className="error-tosat">
                    <p><FontAwesomeIcon icon={faExclamationCircle} /> Invalid Email Address or password</p>
                </div>
                }
                {(error || success) && // ==> if got reply form server <==
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
        </div>
    )
}

export default Register