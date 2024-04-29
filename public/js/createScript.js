function createAccount() {
    // Get form input values
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    var newUsername = document.getElementById('newUsername').value.trim();
    var newPassword = document.getElementById('newPassword').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
  
    // Simple validation
     // Validate minimum sizes
  if (firstName.length < 3 || lastName.length < 3 || newUsername.length < 6 || newPassword.length < 6) {
    alert("Minimum size requirements not met");
    return;
  }
  // Validate no spaces within words
  if (hasSpaceWithinWord(firstName) || hasSpaceWithinWord(lastName) || hasSpaceWithinWord(newUsername)) {
    alert("Spaces within words are not allowed");
    return;
  }
  // Validate password requirements
  if (!isValidPassword(newPassword)) {
    alert("Password must be at least 6 characters with at least one capital letter and one number");
    return;
  }
  // Simple validation
  if (newPassword !== confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }

  url = "/createUser";
  var requestData = {
    firstName: firstName,
    lastName: lastName,
    userName: newUsername,
    password: newPassword
  };

  // Make the AJAX POST request using jQuery
  $.ajax({
    url: url,
    type: 'POST',
    data: requestData,
    success: function(response) {
      if (response.successful === true) {
        alert("Your account has been created!!!");
        location.href = "/signIn_page";
      } else {
        alert("Please change UserName!!!!!!");
        location.reload();
      }
    }
  });

}

function capitalizeInput(inputId) {
    var inputElement = document.getElementById(inputId);
    var inputValue = inputElement.value;
  
    // Capitalize the first letter of the input value
    var capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  
    // Set the capitalized value back to the input field
    inputElement.value = capitalizedValue;
}

function isValidPassword(password) {
    // Password must be at least 6 characters with at least one capital letter and one number
    var hasCapitalLetter = /[A-Z]/.test(password);
    var hasNumber = /\d/.test(password);
  
    return password.length >= 6 && hasCapitalLetter && hasNumber;
}

function hasSpaceWithinWord(input) {
    return /\s/.test(input);
}


function togglePasswordVisibility() {
  var passwordInput = document.getElementById("newPassword");
  var toggleImage = document.getElementById("toggleImage");

  // Toggle the password input type between "password" and "text"
  passwordInput.type = (passwordInput.type === "password") ? "text" : "password";

  // Toggle the image source between "show.png" and "hide.png"
  // toggleImage.style.width = "20px";
  toggleImage.src = (passwordInput.type === "password") ? "public/images/show.png" : "public/images/hide.png";
}