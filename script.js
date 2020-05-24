const mainContent = document.querySelector('main');
const searchInput = document.querySelector('.search');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalImg = document.querySelector('.modal-content img');
const modalName = document.querySelector('.modal-content .name');
const modalEmail = document.querySelector('.modal-content .email');
const modalAddress = document.querySelector('.modal-content .address');
const modalTphone = document.querySelector('.tphone');
const modalStreet = document.querySelector('.street');
const modalBday = document.querySelector('.bday');
const left = document.querySelector('.left');
const right = document.querySelector('.right');




let employeesArray = [];



// fetch

fetch('https://randomuser.me/api/?results=12&nat=gb,us,es')
    .then(response => response.json())
    .then(res => res.results)
    .then(data => displayEmployees(data))
    .catch(err => console.log(err));


// Functions 


// display the Employees

function displayEmployees(x) {
    
    employeesArray.push(...x);

    let employeeHtml = '';

    employeesArray.forEach((employee, i) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        
        employeeHtml += `
            <div class="card-container" data-index="${i}">
                <img src="${picture.large}">
                <div class="text">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>`;
        
    });
    mainContent.innerHTML = employeeHtml;    
};

// display the Modal

function displayModal(index) {
    
    let num = index;
    let date = new Date(employeesArray[index].dob.date);
    let emp = employeesArray[index];

    let picture = emp.picture.large;
    let name = `${emp.name.first} ${emp.name.last}`;
    let email = emp.email;
    let city = emp.location.city;
    let tphone = emp.cell;
    let streetNum = emp.location.street.number; 
    let street = emp.location.street.name;
    let state = emp.location.state;
    let postcode = emp.location.postcode;

    modalImg.setAttribute('src', picture);
    modalName.innerHTML = name;
    modalEmail.innerHTML = email;
    modalAddress.innerHTML = city;
    modalTphone.innerHTML = tphone;
    modalStreet.innerHTML = `${streetNum} ${street}, ${state} ${postcode}`;
    modalBday.innerHTML = `Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

    overlay.classList.remove('hidden');
    overlay.setAttribute('data-index', num);
}






// event listeners

//modal pop up
mainContent.addEventListener('click', e => {

    if(e.target !== mainContent) {
        const card = e.target.closest('.card-container');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// modal close button


closeBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

window.addEventListener('click', e => {
    if(e.target == overlay) {
        overlay.classList.add('hidden');
    }
});



// search 

searchInput.addEventListener('keyup', () => {
    let value = searchInput.value.toLowerCase();
    
    for(let i = 0; i < employeesArray.length; i++) {
        let card = document.querySelectorAll('[data-index]');
        if(employeesArray[i].name.first.toLowerCase().indexOf(value) == -1 && 
           employeesArray[i].name.last.toLowerCase().indexOf(value) == -1) {
            card[i].classList.add('hidden');
        } else {
            card[i].classList.remove('hidden');
        }
    }
});

modalContent.addEventListener('click', e => {
    let dataIndex = overlay.getAttribute('data-index');
    if(e.target.classList.contains('left')) {
        dataIndex = parseFloat(dataIndex) - 1;
        let hiddenElements = document.querySelectorAll('[data-index]')[dataIndex];
        
        if (dataIndex === -1 ) {
            dataIndex = 11;
            displayModal(dataIndex);
        }
        else {
            displayModal(dataIndex);
        }
    }
    if(e.target.classList.contains('right')) {
        dataIndex = parseFloat(dataIndex) + 1;
        let hiddenElements = document.querySelectorAll('[data-index]')[dataIndex];
        if(dataIndex == 12 ) {
            dataIndex = 0;
            displayModal(dataIndex);
        } 
        else {
            displayModal(dataIndex);
        }
    }
});