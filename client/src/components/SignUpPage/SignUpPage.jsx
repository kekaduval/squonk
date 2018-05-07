import React from 'react';
import './SignUpPage.css'

const LoginPage = props => {
    return <div className="about">
        <div className="formContainer">
          <div className="formTitle formTitleLogin">Sign UP</div>
          <form className="form formLogin">
            <div className="formInputContainer">
              <input className="formInput" name="usernameCreate" onChange={props.handleChange} value={props.value.usernameCreate} type="text" placeholder="USERNAME" />
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <input className="formInput" name="password" onChange={props.handleChange} value={props.value.password} type="password" placeholder=" ENTER PASSWORD" />
              </div>
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <input className="formInput" name="password2" onChange={props.handleChange} value={props.value.password2} type="password" placeholder="CONFIRM PASSWORD" />
              </div>
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <select onChange={props.handleChange} name="secQuestion">
                  <option value="What is your Childhood Nickname?">
                    What is your Childhood Nickname?
                  </option>
                  <option value="What is your Mother's Maiden Name?">
                    What is your Mother's Maiden Name?
                  </option>
                  <option value="What is your First Pet's Name?">
                    What is your First Pet's Name?
                  </option>
                  <option value="What is your Favorite Color?">
                    What is your Favorite Color?
                  </option>
                </select>
              </div>
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <input className="formInput" name="secQuestionAnswer" onChange={props.handleChange} value={props.value.secQuestionAnswer} type="text" placeholder="SECURITY QUESTION ANSWER" />
              </div>
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <select onChange={props.handleChange} name="secQuestion2">
                  <option value="What is your Favorite Junk Food?">
                    What is your Favorite Junk Food?
                  </option>
                  <option value="Apple or Samsung?">
                    Apple or Samsung?
                  </option>
                  <option value="StarWars or StarTrek?">
                    StarWars or StarTrek?
                  </option>
                  <option value="What is the make of your first car?">
                    What is the make of your first car?
                  </option>
                </select>
              </div>
            </div>

            <div className="formInputContainer">
              <div className="formInputWrapper">
                <input className="formInput" name="secQuestion2Answer" onChange={props.handleChange} value={props.value.secQuestion2Answer} type="text" placeholder="SECURITY QUESTION 2 ANSWER" />
              </div>
            </div>

            <div className="formInputContainer">
              <button className="formButton" onClick={event => props.handleClick(event)}>
                Submit
              </button>
              <button className="formButton"> Cancel </button>
            </div>
          </form>
        </div>
      </div>;
}

export default LoginPage;