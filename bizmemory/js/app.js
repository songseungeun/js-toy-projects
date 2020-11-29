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
  {
    id: 2,
    name: "홍길동",
    company: "가나다",
    devision: "UX디자인팀",
    position: "인턴",
    email: "abc@gmail.com",
    mobile: "010-1234-5678",
    fav: false,
  },
  {
    id: 3,
    name: "홍길동",
    company: "가나다",
    devision: "UX디자인팀",
    position: "인턴",
    email: "abc@gmail.com",
    mobile: "010-1234-5678",
    fav: false,
  },
  {
    id: 4,
    name: "홍길동4",
    company: "가나다",
    devision: "UX디자인팀",
    position: "인턴",
    email: "abc@gmail.com",
    mobile: "010-1234-5678",
    fav: true,
  },
];
let item = {};

let errorName = false;
let errorEmail = false;
let errorMobile = false;

// register
const $newInfoForm = document.querySelector(".newInfoForm");
const $newInput = document.querySelectorAll(".newInfoForm > input");
const $submitBtn = document.querySelector(".submitBtn");

// error
const $errorName = document.querySelector(".errorName");
const $errorMobile = document.querySelector(".errorMobile");
const $errorEmail = document.querySelector(".errorEmail");

// name card
const $cardList = document.querySelector(".cardList");
const $favList = document.querySelector(".favList");

const inputReset = () => {
  $newInput.forEach(($input) => ($input.value = ""));
  $submitBtn.disabled = true;
  item = {};
};

const render = () => {
  let favHtml = "";
  let defaultHtml = "";
  let favList = [];
  let defaultList = [];

  list.map((namecard) => {
    if (namecard.fav) favList = [...favList, namecard];
    else defaultList = [...defaultList, namecard];
  });

  $favList.innerHTML = "";
  $cardList.innerHTML = "";

  favList.map((namecard) => {
    favHtml += `
    <li id="${namecard.id}" class="namecard color${namecard.id}">
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

    $favList.innerHTML = favHtml;
  });

  defaultList.map((namecard) => {
    defaultHtml += `
    <li id="${namecard.id}" class="namecard color${namecard.id}">
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

    $cardList.innerHTML = defaultHtml;
  });
};

document.addEventListener("DOMContentLoaded", render);

const generateId = () => Math.max(...list.map((card) => card.id)) + 1;

const handleSubmit = (e) => {
  e.preventDefault();

  item.id = generateId();
  item.fav = false;

  list = [...list, item];

  inputReset();
  render();
};

const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
const mobileRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

const validateInput = ({ target }) => {
  $newInfoForm.addEventListener("submit", handleSubmit);

  let inputName = target.className;
  let inputValue = target.value;

  if (inputName === "name") errorName = inputValue.length >= 2;
  else if (inputName === "email") errorEmail = emailRegExp.test(inputValue);
  else if (inputName === "mobile") errorMobile = mobileRegExp.test(inputValue);

  $errorName.style.display = errorName ? "none" : "block";
  $errorEmail.style.display = errorEmail ? "none" : "block";
  $errorMobile.style.display = errorMobile ? "none" : "block";

  if (errorName && errorMobile && errorEmail) $submitBtn.disabled = false;
  item[inputName] = inputValue;
};

$newInput.forEach(($input) => $input.addEventListener("keyup", validateInput));
$submitBtn.addEventListener("click", handleSubmit);

const deleteCard = (cardId) => {
  list = list.filter((card) => card.id !== +cardId);
  render();
};

const addFavCard = (cardId) => {
  list = list.map((card) =>
    card.id === +cardId ? { ...card, fav: !card.fav } : card
  );
  render();
};

const changeCard = ({ target }) => {
  if (!target.matches("ul > li > div > img")) return;
  let cardId = target.parentNode.parentNode.id;

  if (target.className === "deleteBtn") deleteCard(cardId);
  else if (target.className === "favoriteBtn") addFavCard(cardId);
};

$cardList.addEventListener("click", changeCard);
$favList.addEventListener("click", changeCard);
