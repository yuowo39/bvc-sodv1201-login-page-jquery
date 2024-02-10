let testMode = true;

let users;
let testUsers = [
    { username: "test", password: "Test@123", name: "Test User" }
];

let authStatus = false;
let username = "";
let password = "";
let name = "";
function ProcessLogin(username, password) {
    users.forEach(function (user){
        if (user.username === username.toString().toLowerCase() && user.password === password.toString()) {
            name = user.name;
            authStatus = true;
        }
    });
}

$(document).ready(function () {
    if (testMode === true) {
        users = testUsers;
        let testModeEle = $("<p></p>");
        testModeEle.html("&emsp;&emsp;TEST MODE ON&emsp;&emsp;USERNAME: test&emsp;&emsp;PASSWORD: Test@123&emsp;&emsp;TEST MODE ON&emsp;&emsp;");
        testModeEle.attr("id", "testMode");
        $("header").append(testModeEle);
    }

    let titleEle = $("<h1></h1>");
    titleEle.text("Login Authentication");
    titleEle.attr("id", "title");
    $("header").append(titleEle);

    // loginWindow
    let loginWindowEle = $("<div></div>");
    loginWindowEle.attr("id", "loginWindow");
    $("main").append(loginWindowEle);

    let usernameInputEle = $("<input></input>");
    usernameInputEle.attr("placeholder", "Username");
    usernameInputEle.attr("type", "text");
    usernameInputEle.attr("id", "username");

    let passwordInputEle = $("<input></input>");
    passwordInputEle.attr("placeholder", "Password");
    passwordInputEle.attr("type", "password");
    passwordInputEle.attr("id", "password");

    let usernameLengthMsgEle = $("<p></p>");
    usernameLengthMsgEle.attr("id", "usernameLengthMsg");
    usernameLengthMsgEle.text("The username should not be empty!");
    usernameLengthMsgEle.css("color", "red");
    usernameLengthMsgEle.hide();

    let passwordLengthMsgEle = $("<p></p>");
    passwordLengthMsgEle.attr("id", "passwordLengthMsg");
    passwordLengthMsgEle.text("The length of password should be longer than or equate to 6!");
    passwordLengthMsgEle.css("color", "red");
    passwordLengthMsgEle.hide();

    let loginBtnEle = $("<button></button>");
    loginBtnEle.text("Login");
    loginBtnEle.attr("id", "login");
    loginBtnEle.click(function () {
        username = $("#username").val();
        password = $("#password").val();

        // reset
        if (username.length !== 0) {
            $("#username").css("border", "");
            $("#usernameLengthMsg").hide();
        }

        if (password.length >= 6) {
            $("#password").css("border", "");
            $("#passwordLengthMsg").hide();
        }

        // set
        if (username.length === 0) {
            $("#username").css("border", "2px solid red");
            $("#usernameLengthMsg").show();
        }

        if (password.length < 6) {
            $("#password").css("border", "2px solid red");
            $("#passwordLengthMsg").show();
        }

        if (username.length === 0 || password.length < 6) {
            return;
        }

        ProcessLogin(username, password);

        if (authStatus === true) {
            $("#loginWindow").hide();
            $("#closeWindowBtn").hide();
            $("#msg").css("color", "green");
            $("#msg").html("Login successful! Welcome back, " + name + "!");
            $("#msgWindow").show();
        } else {
            $("#loginWindow").hide();
            $("#msg").css("color", "red");
            $("#msg").html("Login failed! The username or password is wrong!");
            $("#msgWindow").show();
        }
    });


    // msgWindow
    let msgWindowEle = $("<div></div>");
    msgWindowEle.attr("id", "msgWindow");
    msgWindowEle.css("display", "none");
    $("main").append(msgWindowEle);

    let msgEle = $("<p></p>");
    msgEle.attr("id", "msg");

    let msgWinBtnEle = $("<button></button>");
    msgWinBtnEle.text("Try Again");
    msgWinBtnEle.attr("id", "closeWindowBtn");
    msgWinBtnEle.click(function () {
        $("#msgWindow").hide();
        $("#loginWindow").show();
    });

    let copyrightEle = $("<p></p>");
    copyrightEle.text("© Yu 2024");
    copyrightEle.attr("id", "copyright");

    $("#loginWindow").append(usernameInputEle);
    $("#loginWindow").append(passwordInputEle);
    $("#loginWindow").append(usernameLengthMsgEle);
    $("#loginWindow").append(passwordLengthMsgEle);
    $("#loginWindow").append(loginBtnEle);

    $("#msgWindow").append(msgEle);
    $("#msgWindow").append(msgWinBtnEle);

    $("footer").append(copyrightEle);
});