const bookingBtn = document.querySelector(".Booking_btn");
const infoUser = document.querySelector(".info_user");
const infoUserbtn = document.querySelector(".user_btn");
const historyBtn = document.querySelector(".history_btn");
const historyUser = document.querySelector(".history_user");
const disBtn = document.querySelector(".dis_btn");

const place = document.querySelector(".place");
const time = document.querySelector(".time");
const stylist = document.querySelector(".stylist");
const service = document.querySelector(".service");

let booking = JSON.parse(localStorage.getItem('booking'));

// chuyển đến trang đặt lịch 
bookingBtn.addEventListener('click', function () {
    location.href = "http://127.0.0.1:5500/trang%20%C4%91%E1%BA%B7t%20l%E1%BB%8Bch/dat_lich.html";
});

// khi bấm lịch sử hiện lịch sử  
historyBtn.addEventListener('click', function () {
    infoUser.style.display = 'none';
    historyUser.style.display = 'block';
});

// khi bấm thông tin hiện thông tin 
infoUserbtn.addEventListener('click', function () {
    historyUser.style.display = 'none';
    infoUser.style.display = 'block';
});

// đẩy thông từ local vào trang tt cá nhân 
const loginBtn = document.querySelector(".btn");
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");

let infoUsers = JSON.parse(localStorage.getItem('users'))
for (let i = 0; i < infoUsers.length; i++) {
    if (infoUsers[i].isLogin == true) {
        name.textContent = infoUsers[i].username;
        email.textContent = infoUsers[i].email;
        phone.textContent = infoUsers[i].phone;
        loginBtn.textContent = infoUsers[i].username;
    }
};


// đăng xuất 

disBtn.addEventListener('click', function () {
    for (let j = 0; j < infoUsers.length; j++) {
        if (infoUsers[j].isLogin == true) {
            infoUsers[j].isLogin = false
        }
    }
    localStorage.setItem("users", JSON.stringify(infoUsers))
    location.href = 'http://127.0.0.1:5500/trangchu.html'
})


// đẩy thông tin từ trang đặt lịch qua local vào lịch sự đặt hàng 

function refreshUserCard() {
    const userCard = document.querySelector(".user_card");
    userCard.innerHTML = "";

    for (let a = 0; a < booking.length; a++) {
        let newCard = "";

        for (let b = 0; b < infoUsers.length; b++) {
            if (booking[a].nameNew == infoUsers[b].username) {
                newCard += `<div class="oder-item">
          <div class="place">
            <span>Địa điểm:</span>
            <span>${booking[a].location}</span>
          </div>
          <div class="time">
            <span>Thời gian:</span>
            <span>${booking[a].datetime}</span>
          </div>
          <div class="stylist">
            <span>Stylist:</span>
            <span>${booking[a].stylist}</span>
          </div>
          <div class="service">
            <span>Dịch vụ:</span>
            <span>${booking[a].service}</span>
          </div>
          <button class="cancel" onclick="cancelBooking(${a})">Hủy lịch</button>
          <hr>
        </div>`;
            }
        }

        userCard.innerHTML += newCard;
    }

    if (booking.length === 0) {
        userCard.innerHTML = "Không có lịch đặt.";
    }
}

refreshUserCard();

// Hủy lịch
function cancelBooking(index) {
    booking.splice(index, 1);
    localStorage.setItem('booking', JSON.stringify(booking));
    refreshUserCard();
}


