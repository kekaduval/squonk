import React from 'react';
import './SecQuestionsDisplay.css'

const SecQuestionsDisplay = props => {
    return (

        <React.Fragment>
            <div className="">
                <div className="kestion">
                    <select name="secQuestion" >
                        <option >
                            PLEASE CHOOSE A SECURITY QUESTION.
                  </option>
                        <option value="What is your Childhood Nickname?">
                            What is your Childhood Nickname?
                  </option>
                        <option value="What is your Mother's Maiden Name?">
                            What is your Mother's Maiden Name?
                  </option>
                        <option value="What is your First Pet's Name?" >
                            What is your First Pet's Name?
                  </option>
                        <option value="What is your Favorite Color?" >
                            What is your Favorite Color?
                  </option>
                    </select>
                </div>
            </div>

            <div className="kestion1">
                <div className="answer">
                    <input className="formInput" name="secQuestionAnswer" type="text" placeholder="SECURITY QUESTION ANSWER" />
                </div>
            </div>

            <div className="">
                <div className="kestion">
                    <select name="secQuestion2" >
                        <option >
                            PLEASE CHOOSE A SECURITY QUESTION.
                  </option>
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

            <div className="">
                <div className="answer">
                    <input className="formInput" name="secQuestion2Answer" type="text" placeholder="SECURITY QUESTION 2 ANSWER" />
                </div>
            </div>


            <div className="">
                <button className="custombtn" >
                    Submit
              </button>
                <button className="custombtn" onClick={props.onClick}> Cancel </button>
            </div>
        </React.Fragment>
    )
}

export default SecQuestionsDisplay;
