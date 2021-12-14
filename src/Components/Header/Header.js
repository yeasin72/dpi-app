import React from 'react'
import { Link } from 'react-router-dom'
import'./header.css'

const Header = () => {
    const [burgir, setburgir] = React.useState(false)
    // ==> burgir handle <==
    const burgirHandle = () => setburgir(!burgir)

    return (
        <>
        <div className='Header-area'>
            <div className="container">
                <div className="header-main">
                    <div className="hamburger">
                        <div className="icon" onClick={burgirHandle}>
                            <span className={burgir ? 'burgir-slice burgir-top' : 'burgir-slice'}></span>
                            <span className={burgir ? 'burgir-slice burgir-middle' : 'burgir-slice'}></span>
                            <span className={burgir ? 'burgir-slice burgir-bottom' : 'burgir-slice'}></span>
                        </div>
                        {burgir &&
                        <div className='hambargur-menu'>
                            <ul className="menu">
                                <li className="menu-item">
                                    <Link to="/" className="item-link">Home</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/" className="item-link">About</Link>
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                    <div className="logo-section">
                        <a className='logo-link' href="/">
                        <img src="./img/logo-ani.svg" alt="Dhaka Polytechnic Institute" />
                        <h2 className="logo-text">DPI</h2>
                        </a>
                    </div>
                    <div className="account">
                        <Link className="login-link" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Header
