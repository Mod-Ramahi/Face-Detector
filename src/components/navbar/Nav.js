import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = ({setImageEmpty}) => {
    const { pathname } = useLocation()
    const clearImage = () => {
        setImageEmpty()
    }

    return (
        <nav className="navbar">
            {pathname === "/home" ? (<Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}><p onClick={clearImage}>SignOut</p></Link>) : (<Link to='/' style={{ color: 'inherit', textdecoration: 'none' }}><p>SignIn/Register</p></Link>)}
        </nav>
    )
}

export default Nav;