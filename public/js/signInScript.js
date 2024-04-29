function signIn() {
    var url = '/signIn'; // Replace with your sign-in API endpoint
  
    // Gather data from form inputs
    var userName = $('#userName').val().trim();
    var password = $('#password').val().trim();

    if (userName.length <=5 || password.length <= 5) {
        alert("Fill in the correct information!!!");
        return;
    }
  
    // Data to be sent in the request
    var signInData = {
      userName: userName,
      password: password
    };
  
    // Make the AJAX POST request for sign-in using jQuery
    $.ajax({
      url: url,
      type: 'POST',
      data: signInData,
      success: function(response) {
        //   console.log(response);
        if (response === true) {
            alert("User *Not found!!!");
        } else {
            console.log(response.level);
            if (response.level === "user") {
                location.href = "/userCabinet_page";
            } else if (response.level === "admin"){
                location.href = "/adminCabinet_page";
            } else {
                location.href = "/userCabinet_page"; 
            }
        }
        // Handle successful sign-in (e.g., redirect to dashboard)
      }
    });
  }

  function isCookieExist(cookieName) {
    var cookies = document.cookie.split("; ");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        var name = cookie[0];

        if (name === cookieName) {
            return true;
        }
    }

    return false;
}

// Example usage
var myCookieExistsUser = isCookieExist("user");
var myCookieExistsSuper = isCookieExist("super");
var myCookieExistsAdmin = isCookieExist("admin");

if (myCookieExistsUser || myCookieExistsSuper) {
    console.log("The cookie exists!");
    location.href = "userCabinet_page";
} else if (myCookieExistsAdmin){
    location.href = "adminCabinet_page";
}else {
    console.log("The cookie does not exist.");
}
// console.log(document.cookie.split(';'));
