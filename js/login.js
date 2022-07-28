// function login() {

//     const form = {
//         email: () => document.getElementById("email"),
//         loginButton: () => document.getElementById("login-button"),
//         senha: () => document.getElementById("senha"),
//     } 

//     firebase.auth().signInWithEmailAndPassword(form.email().value, form.senha().value).then(response => {
//         console.log('success', response)
//     }).catch(error => {
//         console.log('error', error)
//     })
//     window.location.href = "relatorio.html";
// }
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
}

function login() {
    debugger
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {

        window.location.href = "relatorio.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário nao encontrado";
    }
    return error.message;
}


function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}



function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

