
var passwordInputs = document.querySelectorAll('.formInput[type="password"]');


// show /hides
var showHides = document.querySelectorAll('.formInputShow');
var loop = function loop(i) {
  showHides[i].addEventListener('click', function() {
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

loginContainer.addEventListener('click', function() {
  if (document.body.classList.contains('signup_active')) {
    document.body.classList.remove('signup_active');
  }
});

signupContainer.addEventListener('click', function() {
  if (!document.body.classList.contains('signup_active')) {
    document.body.classList.add('signup_active');
  }
});
