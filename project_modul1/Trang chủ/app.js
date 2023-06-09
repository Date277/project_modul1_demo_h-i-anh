const loginBuntton = document.querySelector(".login_button");
const loginTab = document.querySelector(".login");
const registerTab = document.querySelector(".register");

const loginForm = document.querySelector(".login_form");

const emailAdd = document.querySelector(".email_add");
const passwordAdd = document.querySelector(".password_add");

const registerForm = document.querySelector(".register_form");
const loginBtn = document.querySelector(".enter_btn");
const goRegisterBtn = document.querySelector(".register_btn a");
const registerBtn = document.querySelector(".register_btn");

let users = JSON.parse(localStorage.getItem("users")) || [];

const phoneForm = document.querySelector(".enter_phone");
const phoneInput = document.querySelector(".phoneAdd");
let phoneSave = [];


// sự kiện click cho button mở modal
loginBuntton.addEventListener('click', function (event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click từ lan ra bên ngoài modal
    loginTab.style.display = 'block';
});

// sự kiện click cho toàn bộ document
document.addEventListener('click', function (event) {
    // Kiểm tra nếu người dùng click ra bên ngoài modal
    if (!loginTab.contains(event.target) && event.target !== loginBuntton) {
        loginTab.style.display = 'none';
    }
});

// sử lý sự kiện ở form đăng nhập 
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = emailAdd.value;
    let password = passwordAdd.value;
    //kiểm tra thông tin đăng nhập
    let user = users.find((user) => user.email === email && user.password === password);
    let error1 = document.querySelector(".error1");
    if (user) {
        if (user.status == 'lock') {
            error1.textContent = 'Tài khoản của bạn bị khóa';
            error1.classList.remove('hide');
        } else {
            user.isLogin = true
            localStorage.setItem("users", JSON.stringify(users))
            window.location.href = "http://127.0.0.1:5500/trang%20user/user.html";
        }
    } else {
        error1.textContent = 'Email hoặc mật khẩu không đúng';
        error1.classList.remove('hide');
    }
});

// sử lý sự kiện khi bấm vào 'đăng ký ở đây'

goRegisterBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    loginTab.style.display = 'none';
    registerTab.style.display = 'block';
});

document.addEventListener('click', function (event) {
    if (!registerTab.contains(event.target) && event.target !== goRegisterBtn) {
        registerTab.style.display = 'none';
    }
});



//sử lý sự kiện ở form đăng ký 

// registerForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     let name = document.querySelector('.name_register').value;
//     let email = document.querySelector('.email_register').value;
//     let phone = document.querySelector('.phone_register').value;
//     let password = document.querySelector('.pass_register').value;
//     let confirmPassword = document.querySelector('.repass_register').value;
//     // kiểm tra thông tin đăng ký 
//     if (name === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
//         let error2 = document.querySelector(".error2");
//         error2.textContent = 'Vui lòng điền đầy đủ thông tin';
//         error2.classList.remove('hide');
//         return;

//     }
//     //kiểm tra xem email người dũng đã tồn tại hay chưa 
//     const existingUser = users.find((user) => user.email === email);
//     if (existingUser) {
//         let error3 = document.querySelector(".error3");
//         error3.textContent = 'Email đã được sử dụng';
//         error3.classList.remove('hide');
//         return;
//     }
//     // kiểm tra số điện thoại đã tồn tại hay chưa 
//     const existingPhone = users.find((user) => user.phone === phone);
//     if (existingPhone) {
//         let error4 = document.querySelector(".error4");
//         error4.textContent = 'Số điện thoại đã được sử dụng';
//         error4.classList.remove('hide');
//         return;
//     }
//     // kiểm tra định dạng password đã đúng chưa 
//     function validatePassword(password) {
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//         return passwordRegex.test(password);
//     }
//     if (!validatePassword(password)) {
//         let error5 = document.querySelector(".error5");
//         error5.textContent = 'Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 ký tự, gồm chữ cái viết hoa, viết thường và số. nhập không đúng ';
//         error5.classList.remove('hide');
//         return;
//     }
//     // Kiểm tra xác nhận mật khẩu
//     if (password !== confirmPassword) {
//         let error6 = document.querySelector(".error6");
//         error6.textContent = 'Mật khẩu không khớp';
//         error6.classList.remove('hide');
//         return;
//     }

//     //Đăng ký thành công
//     const newUser = {
//         id: Math.floor(Math.random() * 100000),
//         username: name,
//         email: email,
//         phone: phone,
//         password: password,
//         isLogin: false,
//         status: 'Unlock'
//     };
//     users.push(newUser);
//     alert('Đăng ký thành công!');
//     // lưu tài khoản đăng ký vào local 

//     localStorage.setItem('users', JSON.stringify(users));
//     // Xóa các trường thông tin đăng ký
//     document.querySelector('.name_register').value = '';
//     document.querySelector('.email_register').value = '';
//     document.querySelector('.phone_register').value = '';
//     document.querySelector('.pass_register').value = '';
//     document.querySelector('.repass_register').value = '';

//     // chuyển về trang đăng nhập
//     registerTab.style.display = 'none';
//     loginTab.style.display = 'block';
// });

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.querySelector('.name_register').value;
    let email = document.querySelector('.email_register').value;
    let phone = document.querySelector('.phone_register').value;
    let password = document.querySelector('.pass_register').value;
    let confirmPassword = document.querySelector('.repass_register').value;
    // kiểm tra thông tin đăng ký 
    if (name === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
        let error2 = document.querySelector(".error2");
        error2.textContent = 'Vui lòng điền đầy đủ thông tin';
        error2.classList.remove('hide');
        return;
    } else {
        let error2 = document.querySelector(".error2");
        error2.textContent = '';
        error2.classList.add('hide');
    }

    //kiểm tra xem email người dùng đã tồn tại hay chưa 
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        let error3 = document.querySelector(".error3");
        error3.textContent = 'Email đã được sử dụng';
        error3.classList.remove('hide');
        return;
    } else {
        let error3 = document.querySelector(".error3");
        error3.textContent = '';
        error3.classList.add('hide');
    }

    // kiểm tra số điện thoại đã tồn tại hay chưa 
    const existingPhone = users.find((user) => user.phone === phone);
    if (existingPhone) {
        let error4 = document.querySelector(".error4");
        error4.textContent = 'Số điện thoại đã được sử dụng';
        error4.classList.remove('hide');
        return;
    } else {
        let error4 = document.querySelector(".error4");
        error4.textContent = '';
        error4.classList.add('hide');
    }

    // kiểm tra định dạng password đã đúng chưa 
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }
    if (!validatePassword(password)) {
        let error5 = document.querySelector(".error5");
        error5.textContent = 'Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 8 ký tự, gồm chữ cái viết hoa, viết thường và số. nhập không đúng ';
        error5.classList.remove('hide');
        return;
    } else {
        let error5 = document.querySelector(".error5");
        error5.textContent = '';
        error5.classList.add('hide');
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
        let error6 = document.querySelector(".error6");
        error6.textContent = 'Mật khẩu không khớp';
        error6.classList.remove('hide');
        return;
    } else {
        let error6 = document.querySelector(".error6");
        error6.textContent = '';
        error6.classList.add('hide');
    }

    //Đăng ký thành công
    const newUser = {
        id: Math.floor(Math.random() * 100000),
        username: name,
        email: email,
        phone: phone,
        password: password,
        isLogin: false,
        status: 'Unlock'
    };
    users.push(newUser);
    alert('Đăng ký thành công!');
    // lưu tài khoản đăng ký vào local 

    localStorage.setItem('users', JSON.stringify(users));
    // Xóa các trường thông tin đăng ký
    document.querySelector('.name_register').value = '';
    document.querySelector('.email_register').value = '';
    document.querySelector('.phone_register').value = '';
    document.querySelector('.pass_register').value = '';
    document.querySelector('.repass_register').value = '';

    // chuyển về trang đăng nhập
    registerTab.style.display = 'none';
    loginTab.style.display = 'block';
});

// enter phone form

phoneForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const phoneNumber = phoneInput.value;

    if (phoneNumber.trim() !== '') {
        const existingUser = users.find((user) => user.phone === phoneNumber);

        if (existingUser) {
            alert('Bạn đã có tài khoản. Hãy đăng nhập để đặt lịch!');

            const loginTab = document.querySelector('.login');
            loginTab.style.display = 'block';
        } else {

            alert('Số điện thoại chưa được đăng ký. Hãy đăng ký để đặt lịch!');

            const registerTab = document.querySelector('.register');
            registerTab.style.display = 'block';

            const phoneRegisterInput = document.querySelector('.phone_register');
            phoneRegisterInput.value = phoneNumber;

        }
    }
});