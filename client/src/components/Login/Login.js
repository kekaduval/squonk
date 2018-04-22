import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
<div className="formContainer">
  <div className="formWrapper formWrapperLogin">
    <div className="formTitle formTitleLogin">Login</div>
    <form className="form formLogin">
      <div className="formInputContainer">
        <input className="formInput" type="text" placeholder="EMAIL"/>
      </div>
      <div className="formInputContainer">
        <div className="formInputWrapper">
          <input className="formInput" type="password" placeholder="PASSWORD"/>
          <span className="formInputShow">show</span>
        </div>
      </div>
      <div className="formInputContainer">
        <button className="formButton">Login</button>
      </div>
    </form>
  </div>

  <div class="formWrapper formWrapperSignup">
  <div class="formTitle formTitleSignup">Signup</div>
  <form class="form formSignup">
    <div class="formInputContainer">
      <input class="formInput" type="text" placeholder="EMAIL"/>
    </div>
    <div class="formInputContainer">
      <div class="formInputWrapper">
        <input class="formInput" type="password" placeholder="PASSWORD"/><span class="formInputShow">show</span>
      </div>
    </div>
    <div class="formInputContainer">
      <button class="formButton">Signup</button>
    </div>
  </form>
</div>

</div>
    );
  }
}

export default Login;
