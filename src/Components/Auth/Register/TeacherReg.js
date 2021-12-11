import React from 'react'

const TeacherReg = () => {
    return (
        <div className="register-form">
            <div className="form">
                <div className="form-item">
                    <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="form-item">
                    <input type="text" name="roll" placeholder="Roll No." />
                </div>
                <div className="form-item">
                    <input type="text" name="reg" placeholder="Reg. No." />
                </div>
                <div className="form-item">
                    <input type="email" name="email" placeholder="Email" />
                </div>
                <div className="form-item">
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="form-item">
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default TeacherReg
