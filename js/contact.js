(function() {
  var $form = document.querySelector('#contact-form');
  var $emailInput = document.querySelector('#email');
  var $messageInput = document.querySelector('#msg');

  function showErrorMessage($input, message) {
    var $container = $input.parentElement; // .input-wrapper
    // remove an existing error
    var error = $container.querySelector('.error-message');
    if (error) {
      $container.removeChild(error);
    }
    
    // now add the error if the message is not empty
    if (message) {
      var error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      $container.appendChild(error);
    }
  }
  
  function validateEmail() {
    var value = $emailInput.value;
    var hasAtSign = value.indexOf('@') > -1;    
    var hasDot = value.indexOf('.') > -1;
    
    // if has no @ or no dot, it's an  invalid email
    if (!hasAtSign || !hasDot) {
      showErrorMessage($emailInput, 'You must enter a valid email address.');
      return false;
    }
    // clear out previous error messages
    showErrorMessage($emailInput, null);
    return true;
  }
  
  function validateMessage() {
    var value = $messageInput.value;
    
    if (!value) {
      showErrorMessage($messageInput, 'The message is a required field.');
      return false;
    }

    if ((value.length < 40) || (value.length > 500)) {
      showErrorMessage($messageInput, 'The message needs to be at least 40 and max 500 characters long.');
      return false;
    }
    // clear out previous error messages
    showErrorMessage($messageInput, null);
    return true;
  }
  
  function validateForm() {
    var isValidEmail = validateEmail();
    var isValidMessage = validateMessage();
    return isValidEmail && isValidMessage;
  }
  
  // validate the fields once the user starts typing in them
  $emailInput.addEventListener('input', validateEmail);
  $messageInput.addEventListener('input', validateMessage);
  
  // add a submit listener to the form
  $form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server
    if (validateForm()) {
      alert('Success!');
    }
  })
})();