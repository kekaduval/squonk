import React from "react";
import "./ForgotPassword.css";

const ForgotPassword = props => {
  return (
    <div className="">
      <style> {"body { background-color: #e3e7ed; }"}</style>

      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6 col-md-offset-3">
            <div className="iosBlurBg">
              <div className="whiteBg" />
            </div>
            <div className="bottomEnter" />
            <div className="bottomBlurBg" />
            <div className="loginForm">
              <div className="title1">
                <p>
                  {" "}
                  Squonk<br /> <span>Forgot Password</span>{" "}
                </p>

                <hr className="short" />
              </div>
              <form>
                {props.value.showUserNameForgotPassword ? (
 
                  <div className="col-3">
                    <input
                      className="effect-2"
                      name="userNameForgotPassword"
                      onChange={props.handleChange}
                      value={props.value.userNameForgotPassword}
                      type="text"
                      placeholder=" ENTER YOUR USERNAME"
                    />
                    <button
                      className="formButton"onClick={(event) => props.handleUserNameSubmit(event)}>
                      Submit
                    </button>
                    <button className="formButton"> Cancel </button>
                  </div>
                ) : null}



                {props.value.showNewPasswordForgotPassword ? (
                  <React.Fragment>
                    <div className="col-3">
                      <input
                        className="effect-2"
                        name="password"
                        onChange={props.handleChange}
                        value={props.value.password}
                        type="password"
                        placeholder=" ENTER NEW PASSWORD"
                      />
                    </div>

                    <div className="col-3">
                      <input
                        className="effect-2"
                        name="password2"
                        onChange={props.handleChange}
                        value={props.value.password2}
                        type="password"
                        placeholder="CONFIRM NEW PASSWORD"
                      />
                    </div>
                    {/* <button
                      className="formButton"
                      onClick={event => props.handleClick(event)}
                    >
                      Submit
                    </button> */}
                    <button className="formButton"> Cancel </button>
                  </React.Fragment>
                ) : null}

                {props.value.showSecQuesForgotPassword ? (
                  <React.Fragment>
                    <div className="formInputContainer">
                      <div className="formInputWrapper">
                        <select
                          className="select1"
                          onChange={props.handleChange}
                          name="secQuestion"
                        >
                          <option>PLEASE CHOOSE A SECURITY QUESTION.</option>
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

                    <div className="col-3">
                      <input
                        className="effect-2"
                        name="secQuestionAnswer"
                        onChange={props.handleChange}
                        value={props.value.secQuestionAnswer}
                        type="text"
                        placeholder="ENTER YOUR ANSWER"
                      />
                      <span className="focus-border" />
                    </div>

                    <div className="formInputContainer">
                      <div className="formInputWrapper">
                        <select
                          className="select1"
                          onChange={props.handleChange}
                          name="secQuestion2"
                        >
                          <option>PLEASE CHOOSE A SECURITY QUESTION.</option>
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

                    <div className="col-3">
                      <input
                        className="effect-2"
                        name="secQuestion2Answer"
                        onChange={props.handleChange}
                        value={props.value.secQuestion2Answer}
                        type="text"
                        placeholder="ENTER YOUR ANSWER"
                      />
                    </div>
                    {/* <button
                      className="formButton"
                      onClick={event => props.handleClick(event)}
                    >
                      Submit
                    </button> */}
                    <button className="formButton"> Cancel </button>
                  </React.Fragment>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
