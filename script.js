const mainContent = document.querySelector('main');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
const closeBtnk = document.querySelector('.close-btn');


let Users = [];



// fetch

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => Users.push(data.results));


console.log(Users);


// functions 

