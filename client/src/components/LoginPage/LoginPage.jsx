import React from 'react';
import './LoginPage.css'

const LoginPage = props => {
    return (

        <div className="about">
            <div className="formcontainer">
                <div className="formTitle formTitleLogin">Login</div>
                <form className="form formLogin">
                    <div className="formInputContainer">
                        <input className="formInput" type="text" placeholder="EMAIL" />
                    </div>
                    <div className="formInputContainer">
                        <div className="formInputWrapper">
                            <input className="formInput" type="password" placeholder="PASSWORD" />
                        </div>
                    </div>
                    <div className="formInputContainer">
                        <button className="formButton" onClick={(event) => props.handleClick(event)}>Login</button>
                    </div>
                    <div className="formInputContainer">
                        <button className="formButton"> Forgot Password </button>
                    </div>
                    <div className="formInputContainer">
                        <div className="or">
                            <h2> Or </h2>
                        </div>
                        <button className="formButton"> Sign up</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginPage;