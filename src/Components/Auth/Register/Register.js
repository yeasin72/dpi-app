import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator'
import { userLogin } from '../../../Redux/Action/loginAction';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheck, faUpload } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import './../Login/Login.css';
import './Register.css'
import { getDipartment } from '../../../Redux/Action/importantdatAction';
import passwordValidator from 'password-validator'


const Register = () => {
    const dispatch = useDispatch()
    const [errmsg, seterrmsg] = useState({errstatus: false, msg: ''})
    const [name, setname] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [rollNo, setrollNo] = useState('')
    const [regiNo, setregiNo] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [file, setfile] = useState(null)
    const [technology, settechnology] = useState(null)
    const [dipartment, setdipartment] = useState('')
    const [togglepass, settogglepass] = useState(false)
    const [techerORstudent, settecherORstudent] = useState(false)
    const [profileIMG, setprofileIMG] = useState('./img/profile.svg')
    const [customloading, setcustomloading] = useState(false)
    const [toolpit, settoolpit] = useState(false)

    // ==> Week password <==
    const weekPassword = ['password', 'pass123', 'password123', name, email ]

    //  ==> Login data from server <==
    const dipartMent = useSelector(state => state.dipartMent)
    const { loading, teacherTech, settingsData, error, studentTech } = dipartMent

    console.log(settingsData);
    //  ==> setup password validator <==
    const passvali = new passwordValidator()
    passvali.is().min(settingsData ? settingsData.minimum_password_length : 8)
        .is().max(90)
        .has().uppercase()
        .has().lowercase()                              // Must have lowercase letters
        .has().symbols()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()
        .is().not().oneOf(weekPassword);
    
    //  ==> Roll validator
    const rollvali = new passwordValidator()
        rollvali.is().min(settingsData ? settingsData.Student_roll_length : 6)
        rollvali.is().max(settingsData ? settingsData.Student_roll_length : 6)
        rollvali.has().digits(settingsData ? settingsData.Student_roll_length : 6)

    // ==> Registation validator
    const regivali = new passwordValidator()
        regivali.is().min(settingsData ? settingsData.Registation_no_length : 6)
        regivali.is().max(settingsData ? settingsData.Registation_no_length : 6)
        regivali.has().digits(settingsData ? settingsData.Registation_no_length : 6)

    // ==> show/hide pass <== 
    function togglePassword() {
        settogglepass(!togglepass)
    }
    console.log(file);

    // ==> Login Action <==
    const RegisterRequest = () => {
        if (validator.isEmail(email) && passvali.validate(password) && rollvali.validate(rollNo) && regivali.validate(regiNo) && name.length > 4) {
            const formdata = {
                "email": email,
                "password": password,
                "Roll_no": rollNo,
                "Reg_no": regiNo,
                "username": email,
                "Name": name,
                "Phone_number": phoneNumber,
                "Student": techerORstudent === false ? true : false,
                "teacher": techerORstudent ? true : false,
                "student_technology": techerORstudent === false ? technology : null,
                "teacher_technology": techerORstudent ? technology : null,
            }
            dispatch(userLogin(formdata))
        }// ==> if data not valid <==
        else{
            if (validator.isEmail(email)) {
                seterrmsg({errstatus: true, msg: 'E-mail address not valid'})
                setTimeout(() => {
                    seterrmsg({errstatus: false, msg: ''})
                }, 6000);
            }
            else if (passvali.validate(password)) {
                seterrmsg({errstatus: true, msg: 'Password not strong or valid'})
                setTimeout(() => {
                    seterrmsg({errstatus: false, msg: ''})
                }, 6000);
            } 
            else if (rollvali.validate(rollNo)) {
                seterrmsg({errstatus: true, msg: 'Roll number not valid'})
                setTimeout(() => {
                    seterrmsg({errstatus: false, msg: ''})
                }, 6000);
            }
            else if (regivali.validate(regiNo)) {
                seterrmsg({errstatus: true, msg: 'Registation number not valid'})
                setTimeout(() => {
                    seterrmsg({errstatus: false, msg: ''})
                }, 6000);
            }else{
                seterrmsg({errstatus: true, msg: 'Please put valid information'})
                setTimeout(() => {
                    seterrmsg({errstatus: false, msg: ''})
                }, 6000);
            }
        }
    }

    //  teacher and student toggle
    function teacherAndStudentToggle(who){
        if (who === 'teacher') {
            setcustomloading(true)
            setrollNo(null)
            setregiNo(null)
            settecherORstudent(true)
            setTimeout(() => {
                setcustomloading(false)
            }, 1000);
        }else{
            setcustomloading(true)
            settecherORstudent(false)
            setTimeout(() => {
                setcustomloading(false)
            }, 1000);
        }
        
    }

    // ==> Profile Picture Handle <==
    function profilePicHandler(file){
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setprofileIMG(reader.result)
            }
        }
        file.target.files.length === 1 && reader.readAsDataURL(file.target.files[0])
        file.target.files.length === 1 && setfile(file.target.files[0])
    }

    // Technology Handle
    function dipartmenHandle(id, tech){
        setdipartment(id)
        settechnology(tech)
    }

    React.useEffect(() => {
        dispatch(getDipartment())
    }, [dispatch])
    

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
                
                <div className="r-form">
                    {/* ==> student or teacher toggling <== */}
                    <div className='toggle-buttongroup'>
                        <div className="t-button">
                            <div className={techerORstudent? "t-active-left" :  "t-active-right"}></div>
                            <div className="teacher" onClick={() => teacherAndStudentToggle('teacher')}>Teacher</div>
                            <div className="student" onClick={() => teacherAndStudentToggle('student')}>Student</div>
                        </div>
                    </div>
                    {/* ==> registation form <== */}
                    {loading || customloading ? // ==> if login request is running <==
                    <div className="loading">
                        <ReactLoading type={'cylon'} color={'#273c75'} />
                    </div>
                    :
                    <div className="registion-f" style={techerORstudent? {height: `633px`} : {height: `633px`}}>
                        <div className="form-heading">
                            <h3>{techerORstudent? 'Teacher' : 'Student'} Registation</h3>
                        </div>
                        <div className="registation-form-main">
                            <div className="r-form-item">
                                <div className="r-form-item-multi">
                                    <input onChange={(e) => setname(e.target.value)} type="text" placeholder={techerORstudent? 'Teacher Name' : 'Student Name'} />
                                </div>
                                <div className="r-form-item-multi">
                                    <input onChange={(e) => setphoneNumber(e.target.value)} type="tel" placeholder='Mobile number' />
                                </div>
                            </div>
                            <div className="r-form-item">
                                <div className="r-form-item-multi">
                                    <input onChange={(e) => setemail(e.target.value)} onClick={() => settoolpit(false)} type="email" placeholder="E-mail" />
                                </div>
                                <div className="r-form-item-multi">
                                    <input onChange={(e) => setpassword(e.target.value)} onClick={() => settoolpit(true)} type={togglepass ? "text" : "password" }placeholder='Password' />
                                    <button className='toggle-pass' onClick={togglePassword}>
                                        {togglepass?
                                            <FontAwesomeIcon icon={faEye}/>:
                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                        }
                                    </button>
                                    {toolpit &&
                                    <div className='toolpit'>
                                        <ul>
                                            <li>minimum 8 character</li>
                                            <li>Use lowercase letter</li>
                                            <li>Use uppercase letter</li>
                                            <li>Use special character</li>
                                            <li>Use 2 digit</li>
                                        </ul>
                                    </div>}
                                </div>
                            </div>
                            {techerORstudent === false &&
                            <div className="r-form-item">
                                <div className="r-form-item-multi">
                                    <input type="text" placeholder='Board Roll' onClick={() => settoolpit(false)} />
                                </div>
                                <div className="r-form-item-multi">
                                <input onClick={() => settoolpit(false)} type="text" placeholder='Board Registation no' />
                                </div>
                            </div>
                            }
                            <div className="r-form-item">
                                <div className="r-form-item-multi-img-left">
                                    <input type="file" onClick={() => settoolpit(false)} onChange={(e) => profilePicHandler(e)} className='file-input__input' id='profilepic' />
                                    <label className='file_upload' htmlFor="profilepic">
                                        <div className='file_upload_style'>
                                            <FontAwesomeIcon icon={faUpload} /> Profile Picture</div>
                                    </label>
                                    {/* technology setup */}
                                    {(teacherTech || studentTech) && 
                                    <div className='technology'>
                                        <h5>{techerORstudent? 'Teacher' : 'Student'} Technology</h5>
                                        <div className='devider'></div>
                                        <div className="radio-buttongroup">
                                            {techerORstudent &&
                                                teacherTech && teacherTech.map((ele) => (
                                                <div key={ele.id} className={dipartment === ele.id ? "dipartment active" : "dipartment"} onClick={() => dipartmenHandle(ele.id, ele)}>
                                                    {dipartment === ele.id &&
                                                    <div className="checked">
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </div>
                                                    }
                                                    <div className="content">
                                                    {ele.technology_name}
                                                    </div>
                                                </div>
                                            ))
                                            }{techerORstudent === false &&
                                                studentTech && studentTech.map((ele) => (

                                                <div key={ele.id} className={dipartment === ele.id ? "dipartment active" : "dipartment"} onClick={() => dipartmenHandle(ele.id, ele)}>
                                                    {dipartment === ele.id &&
                                                    <div className="checked">
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </div>}
                                                    <div className="content">
                                                        {ele.Technology_Name}
                                                    </div>
                                                </div>
                                            ))
                                            }
                                        </div>
                                        
                                    </div>
                                    }
                                </div>
                                <div className="r-form-item-multi-img">
                                    <div className="pic-privew">
                                        <img src={profileIMG} alt="Profile" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="r-form-item">
                                <button className='register-btn' onClick={RegisterRequest}>Register</button>
                            </div>
                            <div className="form-item">
                                <p>already have account? <Link to="/login">Login</Link> </p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                {errmsg.errstatus && // ==> if got error from validation <==
                <div className="error-tosat">
                    <p><FontAwesomeIcon icon={faExclamationCircle} /> {errmsg.msg}</p>
                </div>
                }
                {(error ) && // ==> if got reply form server <== || success
                <div className={error ? "error-tosat" : "success-toast"}>
                    <p>{error ? <>
                        <FontAwesomeIcon icon={faExclamationCircle} /> {error}
                    </> : <>
                        <FontAwesomeIcon icon={faCheck} />
                        {/* {success} */}
                    </>}</p>
                </div>
                }
                
            </div>
            </div>
        </div>
    )
}

export default Register