import React from 'react';
import './LoginPage.css'

const LoginPage = props => {
    return <div className="">
      <style> {'body { background-color: BLUE; }'}</style>

        <div className="formContainer">
          <div className="formTitle formTitleLogin">NEW LOGIN</div>
          <form className="form formLogin">
            <div className="formInputContainer">
              <input className="formInput" name="usernameLogin" type="text" onChange={props.handleChange} value={props.value.usernameLogin} placeholder="USERNAME" />
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <input className="formInput" name="passwordLogin" type="text" onChange={props.handleChange} value={props.value.passwordLogin} placeholder=" ENTER PASSWORD" />
              </div>
            </div>

            <div className="formInputContainer">
              <button className="formButton" onClick={event => props.handleClick(event)}>
                Login
              </button>
            </div>
            <div className="formInputContainer">
              <button className="formButton"> Forgot Password </button>
            </div>
            <div className="formInputContainer">
              <div className="or">
                <h2> Or </h2>
              </div>
              <button className="formButton" onClick={event => props.handleClickSignUp(event)}>
                {" "}
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>;
}

export default LoginPage;



