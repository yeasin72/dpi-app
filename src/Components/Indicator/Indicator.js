import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import Auth from '../Auth/Auth'
import Home from '../Home/Home'

const Indicator = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-or-register" element={<Auth />} />
            </Routes>
        </Router>
    )
}

export default Indicator
