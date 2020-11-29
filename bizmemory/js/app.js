let list = [
  {
    id: 1,
    name: "홍길동",
    company: "가나다",
    devision: "UX디자인팀",
    position: "인턴",
    email: "abc@gmail.com",
    mobile: "010-1234-5678",
    fav: false,
  },
];
let item = {};
let error = true;

// register
const $newInfoForm = document.querySelector(".newInfoForm");
const $newInput = document.querySelectorAll(".newInfoForm > input");
const $submitBtn = document.querySelector(".submitBtn");

// name card
const $cardList = document.querySelector(".cardList");

const render = () => {
  let html = "";

  list.map((namecard) => {
    html += `
          <li id="1" class="namecard color3">
            <div class="namecardWrapper">
              <div class="namecardInfo">
                <span class="cardName">${namecard.name}</span>
                <span class="cardMobile">${namecard.mobile}</span>
                <span class="cardEmail">${namecard.email}</span>
              </div>
              <div class="namecardCompany">
                <span class="cardCompany">${namecard.company}</span>
                <span class="cardDivision">${namecard.devision}</span>
                <span class="cardPosition">${namecard.position}</span>
              </div>
            </div>
            <div class="namecardIcon">
              <img class="favoriteBtn" src="./img/fav-icon${
                namecard.fav ? "-on" : ""
              }.png">
              <img class="deleteBtn" src="./img/close-btn.png">
            </div>
          </li>`;
  });

  $cardList.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", render);

const inputReset = () => {
  $newInput.forEach(($input) => ($input.value = ""));
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e);
  if (!error) {
  }
  list = [...list, item];
  console.log(list);
  inputReset();
};

const validateInput = (e) => {
  $newInfoForm.addEventListener("submit", handleSubmit);
  console.log(e.target.className);
  let inputName = e.target.className;
  let inputValue = e.target.value;

  item[inputName] = inputValue;

  console.log(item);
};

$newInput.forEach(($input) => $input.addEventListener("keyup", validateInput));

$submitBtn.addEventListener("click", handleSubmit);
