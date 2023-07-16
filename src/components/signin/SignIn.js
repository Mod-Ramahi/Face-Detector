import React, { useState } from "react";
import './SignIn.css';
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({loadUser}) => {
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate()
    
    const nameChange= (event) => {
        setUserEmail(event.target.value)
    }
    const passwordChange= (event) => {
        setUserPassword(event.target.value)
    }
    const handleSubmit = () => {
        fetch('http://localhost:3000/signin', {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user)
                navigate('/home')
            }
            else{
                alert('try again')
            }
        })
    }
    return (
        <div className="sign_in">
            <span className="title_span">Sign In</span>
            <div className="form">
                <div className="user_name">
                    <label htmlFor="name">Enter your Email:</label>
                    <input type="email" id="name" onChange={nameChange}/>
                </div>
                <div className="user_password">
                    <label htmlFor="password">Enter your password:</label>
                    <input type="password" id="password" onChange={passwordChange}/>
                </div>
                <div className="submit">
                    <button className="submit_button" type="submit" onClick={handleSubmit}>Sign In</button>
                    <Link to='/register' style={{color:'inherit', textDecoration:'none'}}>
                        <button className="register_button">New ? Register</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;