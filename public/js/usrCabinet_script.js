function toggleSecretKeyVisibility() {
    var secretKeyText = document.getElementById('secretKey');
    // console.log(secretKeyText.style.display);
    if (secretKeyText.style.display === 'none' || secretKeyText.style.display === '') {
        secretKeyText.style.display = 'inline';
    } else {
        secretKeyText.style.display = 'none';
    }
}

function copySecretKey() {
    var secretKeyText = document.getElementById('secretKey');
    var tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    
    // let originalString = secretKeyText.innerText;
    // console.log(originalString.length);
    // let spaceToAdd = "\n";
    // let indexToAdd = 260;
    // let newString = originalString.substring(0, indexToAdd) + spaceToAdd + originalString.substring(indexToAdd);
    // tempInput.value = newString;
    // console.log(newString.length);
    tempInput.value = secretKeyText.innerText;

    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Secret Key copied to clipboard!');
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

if (myCookieExistsUser || myCookieExistsSuper) {
    console.log("The cookie exists!");
} else {
    console.log("The cookie does not exist.");
    location.href = "/signIn_page";
}

function logOutUser() {
    deleteCookie("user");
    location.href = "/signIn_page";
    deleteCookie("super");
    location.href = "/signIn_page";
}

function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Example usage
function getCookieValue(cookieName) {
    var cookies = document.cookie.split("; ");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        var name = cookie[0];
        var value = cookie[1];

        if (name === cookieName) {
            return decodeURIComponent(value); // Use decodeURIComponent to handle special characters
        }
    }

    return null; // Return null if the cookie with the specified name is not found
}

// Example usage
var yourCookieValueUser = getCookieValue("user");
var yourCookieValueSuper = getCookieValue("super");
// console.log(yourCookieValueSuper, yourCookieValueUser);
var yourCookieValue = yourCookieValueSuper == null ? yourCookieValueUser : yourCookieValueSuper;
var url = '/userinfo';
var userInfo = {
    userName: yourCookieValue
}

$.ajax({
    url: url,
    type: 'POST',
    data: userInfo,
    success: function(response) {
        var secretKey = document.getElementById('secretKey');
        var firstName = document.getElementById('firstName');
        var lastName = document.getElementById('lastName');

        // console.log(response);
        if (response.successful === true) {
            secretKey.innerHTML = "None";
            firstName.innerHTML = "None";
            lastName.innerHTML = "None";
        } else {
            var allSecretKeys = "";
            for (let i = 0; i < response.secretKey.length; i++) {
                allSecretKeys += response.secretKey[i] + "\n";
            }
            if (allSecretKeys.trim().length == 0)
                allSecretKeys = "SECRETKEY not found!!!";

            secretKey.innerHTML = allSecretKeys;
            firstName.innerHTML = response.firstName;
            lastName.innerHTML = response.lastName;
        }
      // Handle successful sign-in (e.g., redirect to dashboard)
    }
  });


function acceptKey() {
    var sKeyText = document.getElementById('secretKey');
    console.log(sKeyText.innerText);
    if(sKeyText.innerText.length < 100){
        alert("You don't have SECRETKEY!!!");
    } else {
        let url = "/acceptList"
        $.ajax({
            url: url,
            type: 'POST',
            data: userInfo,
            success: function(response) {
                if (response.successful == true) {
                    alert("You have confirmed!!!");
                }
            }
        });
    }
}

function cancelKey() {
    // console.log(firstName, lastName);
    let url = "/cancelUniqAcceptList"
    $.ajax({
        url: url,
        type: 'POST',
        data: userInfo,
        success: function(response) {
            if (response.successful == true) {
                alert("You have canceled!!!");
            }
        }
      });
}