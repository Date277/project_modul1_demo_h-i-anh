const loginForm = document.querySelector(".login_form");
console.log(loginForm);
const emailAdd = document.querySelector(".email");
const passwordAdd = document.querySelector(".password");
let adminAccount = {
    emailAdmin: "haianh@gmail.com",
    passwordAdimn: "Haianh123"
};

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("dd");
    let email = emailAdd.value;
    let password = passwordAdd.value;
    if (email === adminAccount.emailAdmin && password === adminAccount.passwordAdimn) {
        location.href = 'http://127.0.0.1:5500/trang%20admin/admin.html';
    } else {
        alert("tài khoản hoặc mật khẩu không đúng")
    }
});