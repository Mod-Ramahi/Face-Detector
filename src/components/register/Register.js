import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = ({loadUser}) => {
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()
    const [userName, setUserName] = useState()

    const navigate = useNavigate()

    const handleEmail = (event) => {
        const e=event.target.value
        setUserEmail(e)
    }
    const handlePassword = (event) => {
        const p=event.target.value
        setUserPassword(p)
    }
    const handleName = (event) => {
        const n=event.target.value
        setUserName(n)
    }
    const handleSubmit = ()=>{
        fetch('http://localhost:3000/register', {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email:userEmail,
                name: userName,
                password: userPassword
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user)
                navigate('/home')
            }
        })
        
        
    }
    return (
        <div className="sign_in">
            <span className="title_span">Register</span>
            <div className="form">
            <div className="user_name">
                    <label htmlFor="realname">Enter your Name:</label>
                    <input type="text" id="realname" onChange={handleName}/>
                </div>
                <div className="user_name">
                    <label htmlFor="name">Enter your Email:</label>
                    <input type="email" id="name" onChange={handleEmail}/>
                </div>
                <div className="user_password">
                    <label htmlFor="password">Enter your password:</label>
                    <input type="password" id="password" onChange={handlePassword}/>
                </div>
                <div className="submit">
                    <button className="submit_button" type="submit" onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Register;