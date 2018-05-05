import React from 'react';

import './IndexPage.css'

const IndexPage = props => {
    
    var passwordInputs = document.querySelectorAll('.formInput[type="password"]');


    // show /hides
    var showHides = document.querySelectorAll('.formInputShow');
    var loop = function loop(i) {
        showHides[i].addEventListener('click', function () {
            if (passwordInputs[i].getAttribute('type') === 'password') {
                passwordInputs[i].setAttribute('type', 'text');
                showHides[i].innerHTML = 'Hide';
            } else {
                passwordInputs[i].setAttribute('type', 'password');
                showHides[i].innerHTML = 'Show';
            }
        });
    };

    // login signup
    var loginContainer = document.querySelector('.formWrapperLogin');
    var signupContainer = document.querySelector('.formWrapperSignup');

    loginContainer.addEventListener('click', function () {
        if (document.body.classList.contains('signup_active')) {
            document.body.classList.remove('signup_active');
        }
    });

    signupContainer.addEventListener('click', function () {
        if (!document.body.classList.contains('signup_active')) {
            document.body.classList.add('signup_active');
        }
    });


    return (
        <React.Fragment>

        <div class="logincontainer">
            <header class="header">
                <div class="logo">
                    <span class="letter letter-1">S</span>
                    <span class="letter letter-2">q</span>
                    <span class="letter letter-3">u</span>
                    <span class="letter letter-4">o</span>
                    <span class="letter letter-5">n</span>
                    <span class="letter letter-6">k</span>
                </div>
            </header>
        </div>

        <div class="formContainer">
            <div class="formWrapper formWrapperLogin">
                <div class="formTitle formTitleLogin">Login</div>

                <form class="form formLogin">
                    <div class="formInputContainer">
                        <input class="formInput" type="text" placeholder="EMAIL" />
                    </div>
                    <div class="formInputContainer">
                        <div class="formInputWrapper">
                            <input class="formInput" type="password" placeholder="PASSWORD" /><span class="formInputShow">show</span>
                        </div>
                    </div>
                    <div class="formInputContainer">
                        <button class="formButton">Login</button>
                    </div>
                </form>
            </div>

            <div class="formWrapper formWrapperSignup">
                <div class="formTitle formTitleSignup">Signup</div>
                <form class="form formSignup">
                    <div class="formInputContainer">
                        <input class="formInput" type="text" placeholder="EMAIL" />
                    </div>
                    <div class="formInputContainer">
                        <div class="formInputWrapper">
                            <input class="formInput" type="password" placeholder="PASSWORD" /><span class="formInputShow">show</span>
                        </div>
                    </div>
                    <div class="formInputContainer">
                        <button class="formButton">Signup</button>
                    </div>
                </form>
            </div>

        </div>

        </React.Fragment>   
    )
}
export default IndexPage;


