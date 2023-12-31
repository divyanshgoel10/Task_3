document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.login-btn').addEventListener('click', validateLogin);
    document.querySelector('.forgot-password').addEventListener('click', sendForgotPasswordEmail);

    function validateLogin() {
        var username = document.querySelector('.username-input').value;
        var password = document.querySelector('.password-input').value;

        // Validating email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            alert("Please enter a valid email address");
            return;
        }

        // Validating password format
        var passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password should be minimum 8 characters long and must contain an uppercase letter, a number. It may include the '@' character");
            return;
        }

        window.location.href = "zendash.html";
    }

    function sendForgotPasswordEmail(event) {
        const recipient = 'support@smartserv.io';
        const subject = 'Password Reset';
        const body = 'I have forgotten my password';

        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    }
});
