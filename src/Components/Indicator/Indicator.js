import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import Login from '../Auth/Login/Login'
import Register from '../Auth/Register/Register'
import Header from '../Header/Header'
import Home from '../Home/Home'

const Indicator = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                <>
                    <Header />
                    <Home />
                </>} />
                <Route path="/login" 
                element={
                <>
                    <Header />
                    <Login />
                </>} />
                <Route path="/register" 
                element={
                <>
                    <Header />
                    <Register />
                </>} />
            </Routes>
        </Router>
    )
}

export default Indicator
