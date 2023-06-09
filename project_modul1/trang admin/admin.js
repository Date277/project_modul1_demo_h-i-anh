const salonButton = document.querySelector(".salon_btn");
const serviceButton = document.querySelector(".service_btn");
const customerButton = document.querySelector(".customer_btn");
const salonShowing = document.querySelector(".salon_table");
const serviceShowing = document.querySelector(".service_table");
const customerShowing = document.querySelector(".customer_table");
const customerTable = document.querySelector(".customerTable tbody");

const salonTable = document.querySelector(".salonTable tbody");
const salonForm = document.querySelector(".edit_salon_form");
const numberInput = document.querySelector(".number");
const streetInput = document.querySelector(".street");
const townInput = document.querySelector(".town");
const districtInput = document.querySelector(".district");
const salonSave = document.querySelector(".salon_save");

const serviceTable = document.querySelector(".serviceTable tbody");
const serviceForm = document.querySelector(".edit_service_form");
const stylistInput = document.querySelector(".stylist");
const serviceInput = document.querySelector(".service");
const priceInput = document.querySelector(".price");
const serviceSave = document.querySelector(".service_save");

let salonList = JSON.parse(localStorage.getItem('SalonList')) || [];
let serviceList = JSON.parse(localStorage.getItem('ServiceList')) || [];

// click salon hiện ra salon table
salonButton.addEventListener('click', function () {
    salonShowing.style.display = 'block';
    serviceShowing.style.display = 'none';
    customerShowing.style.display = 'none';

})

//click service hiện lên
serviceButton.addEventListener('click', function () {
    serviceShowing.style.display = 'block';
    salonShowing.style.display = 'none';
    customerShowing.style.display = 'none';
})

// click customer hiện lên
customerButton.addEventListener('click', function () {
    customerShowing.style.display = 'block';
    salonShowing.style.display = 'none';
    serviceShowing.style.display = 'none';
})

// CRUD cho Salon
// thêm salon
displaySalonList();

salonForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let number = numberInput.value;
    let street = streetInput.value;
    let town = townInput.value;
    let district = districtInput.value;

    let salon = {
        number: number,
        street: street,
        town: town,
        district: district,
    };

    salonList.push(salon);

    numberInput.value = '';
    streetInput.value = '';
    townInput.value = '';
    districtInput.value = '';

    displaySalonList();
    // đẩy local
    localStorage.setItem('SalonList', JSON.stringify(salonList));
});

function displaySalonList() {
    salonTable.innerHTML = '';
    salonList.forEach((salon, index) => {
        const rowSalon = document.createElement('tr');
        rowSalon.innerHTML = `
      <td>${index + 1}</td>
      <td>${salon.number}</td>
      <td>${salon.street}</td>
      <td>${salon.town}</td>
      <td>${salon.district}</td>
      <td>
        <button class="edit" onclick="editSalon(${index})">Sửa</button>
        <button class="delete" onclick="deleteSalon(${index})">Xóa</button>
      </td>
    `;
        salonTable.appendChild(rowSalon);
    });
}
// xóa salon
function deleteSalon(index) {
    salonList.splice(index, 1);
    displaySalonList();
    localStorage.setItem('SalonList', JSON.stringify(salonList));

}
// sửa salon
function editSalon(index) {
    const salon = salonList[index];

    numberInput.value = salon.number;
    streetInput.value = salon.street;
    townInput.value = salon.town;
    districtInput.value = salon.district;
    deleteSalon(index);
}

// CRUD cho service
// thêm salon 
displayServiceList();
serviceForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let stylist = stylistInput.value;
    let service = serviceInput.value;
    let price = priceInput.value;

    let services = {
        stylist: stylist,
        service: service,
        price: price
    };

    serviceList.push(services);

    stylistInput.value = '';
    serviceInput.value = '';
    priceInput.value = '';

    displayServiceList();
    // đẩy local
    localStorage.setItem('ServiceList', JSON.stringify(serviceList));
});

function displayServiceList() {
    serviceTable.innerHTML = '';
    serviceList.forEach((service, index) => {
        const rowService = document.createElement('tr');
        rowService.innerHTML = `
      <td>${index + 1}</td>
      <td>${service.stylist}</td>
      <td>${service.service}</td>
      <td>${service.price}</td>
      <td>
        <button class="edit" onclick="editService(${index})">Sửa</button>
        <button class="delete" onclick="deleteService(${index})">Xóa</button>
      </td>
    `;
        serviceTable.appendChild(rowService);
    });
}
// xóa service
function deleteService(index) {
    serviceList.splice(index, 1);
    displayServiceList();
    localStorage.setItem('ServiceList', JSON.stringify(serviceList));
}
// thêm service
function editService(index) {
    const service = serviceList[index];

    stylistInput.value = service.stylist;
    serviceInput.value = service.service;
    priceInput.value = service.price;
    deleteService(index);
}

// CRUD cho customer

let user = JSON.parse(localStorage.getItem('users'));

function renderUser() {
    let users = `
<thead>
<tr>
    <th>STT</th>
    <th>Tên</th>
    <th>Email</th>
    <th>Điện thoại</th>
    <th>Hành động</th>
</tr>
</thead>`;

    for (let i = 0; i < user.length; i++) {
        let lockClass = user[i].status === 'Unlock' ? 'lock' : 'unlock';
        let lockText = user[i].status === 'Unlock' ? 'Unlock' : 'Lock';
        users += `
    <tr>
    <th>${i + 1}</th>
    <th>${user[i].username}</th>
    <th>${user[i].email}</th>
    <th>${user[i].phone}</th>
    <th>
        <button class="${lockClass}" onclick="Lock_btn(${i})">${lockText}</button>
    </th>
     </tr>`;
    }
    document.querySelector(".customerTable").innerHTML = users;
}
renderUser();

function Lock_btn(e) {
    if (user[e].status === 'Unlock') {
        user[e].status = 'lock';
    } else {
        user[e].status = 'Unlock';
    }
    localStorage.setItem('users', JSON.stringify(user));
    renderUser();
}
