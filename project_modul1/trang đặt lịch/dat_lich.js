let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
let bookingName = JSON.parse(localStorage.getItem('users'));
const saveBtn = document.querySelector(".save_btn");
const doneBooking = document.querySelector(".booking_done");
const userBtn = document.querySelector(".user_btn");
const disBtn = document.querySelector(".dis_btn");
const locationEle = document.querySelector("#location");
const serviceEle = document.querySelector("#service");
const stylistEle = document.querySelector("#stylist");

// hiện tên ô đăng nhập
for (let i = 0; i < bookingName.length; i++) {
    if (bookingName[i].isLogin == true) {
        let chagename = bookingName[i].username
        document.querySelector(".btn").innerHTML = chagename
    }
}

// lấy salonlist trên local
locationEle.innerHTML = '<option value="">-- Địa điểm --</option>';
let salonList = JSON.parse(localStorage.getItem('SalonList')) || [];
salonList.forEach(salon => {
    locationEle.innerHTML += `
    <option value="${salon.number} ${salon.street}, P. ${salon.town}, Q. ${salon.district}, Hà Nội">${salon.number} ${salon.street}, P. ${salon.town}, Q. ${salon.district}, Hà Nội</option>
    `;
});

// lấy dịch vụ trên local
serviceEle.innerHTML = '<option value="">-- dịch vụ --</option>';
let serviceList = JSON.parse(localStorage.getItem('ServiceList')) || [];
serviceList.forEach(element => {
    serviceEle.innerHTML += `
    <option value="${element.service} - ${element.price}">${element.service} - ${element.price}</option>
    `;
});

// lấy stylist trên local
stylistEle.innerHTML = '<option value="">-- stylist --</option>';
serviceList.forEach(element => {
    stylistEle.innerHTML += `
    <option value="Stylist ${element.stylist}">Stylist ${element.stylist} </option>
    `;
});

// khi bấm lịch sử 
userBtn.addEventListener('click', function () {
    location.href = 'http://127.0.0.1:5500/trang%20user/user.html#';
});

// sự kiện khi click nút lưu 
saveBtn.addEventListener('click', function saveAppointment() {
    doneBooking.style.display = "block";
    const location = document.getElementById("location").value;
    const service = document.getElementById("service").value;
    const stylist = document.getElementById("stylist").value;
    const datetime = document.getElementById("datetime").value;

    if (location && service && stylist && datetime) {
        let appointment = {}

        appointment = {
            isLogin: true,
            location: location,
            service: service,
            stylist: stylist,
            datetime: datetime
        };
        for (let j = 0; j < bookingName.length; j++) {
            if (bookingName[j].isLogin == true) {
                let nameLast = bookingName[j].username;

                appointment.nameNew = nameLast

            }
        };
        selectedItems.push(appointment);

        // đẩy lên local
        localStorage.setItem('booking', JSON.stringify(selectedItems));
        displaySelectedItems();

        // Reset form
        document.getElementById("location").selectedIndex = 0;
        document.getElementById("service").selectedIndex = 0;
        document.getElementById("stylist").selectedIndex = 0;
        document.getElementById("datetime").value = "";

    }
})

function displaySelectedItems() {

    const selectedItemsDiv = document.getElementById("selectedItems");
    selectedItemsDiv.innerHTML = "";

    selectedItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("selected-item");

        const location = document.createElement("p");
        location.textContent = "Địa điểm: " + item.location;

        const service = document.createElement("p");
        service.textContent = "Dịch vụ: " + item.service;

        const stylist = document.createElement("p");
        stylist.textContent = "Stylist: " + item.stylist;

        const datetime = document.createElement("p");
        datetime.textContent = "Ngày giờ: " + item.datetime;

        itemDiv.appendChild(location);
        itemDiv.appendChild(service);
        itemDiv.appendChild(stylist);
        itemDiv.appendChild(datetime);

        selectedItemsDiv.appendChild(itemDiv);
    });

}

//đăng xuất
function dis() {
    disBtn.addEventListener('click', function () {
        for (let j = 0; j < bookingName.length; j++) {
            if (bookingName[j].isLogin == true) {
                bookingName[j].isLogin = false
            }
        }
        localStorage.setItem("users", JSON.stringify(bookingName))
        location.href = 'http://127.0.0.1:5500/trangchu.html'
    })
};

dis();