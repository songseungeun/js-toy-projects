//  { user: 0, date: '', msg: '' }
// user > 0: robot, 1: user
let msgState = [];

const $inputMsg = document.querySelector(".input_msg");
const $msgBlock = document.querySelector(".msg_block");
const $inputMsgBlock = document.querySelector(".input_msg_block");
const $enterMsg = document.querySelector(".enter_msg");

const render = () => {
  let html = "";

  msgState.forEach((msgItem) => {
    if (msgItem.user === 0) {
      html += `
      <li class="bot_block">
        <div class="bot_icon"><i class="fas fa-robot"></i></div>
        <div class="bot_msg">${msgItem.msg}</div>
        <div class="bot_date"><em>${msgItem.date}</em></div>
      </li>
    `;
    } else {
      html += `
      <li class="user_block">
        <div class="user_icon"><i class="fas fa-smile"></i></div>
        <div class="user_msg">${msgItem.msg}</div>
        <div class="user_date"><em>${msgItem.date}</em></div>
      </li>
      `;
    }
  });

  $msgBlock.innerHTML = html;
  $msgBlock.scrollTop = $msgBlock.scrollHeight;
};

document.addEventListener("DOMContentLoaded", render);

const compare = (trigger, reply, text) => {
  let items;
  let item;

  for (let x = 0; x < trigger.length; x++) {
    for (let y = 0; y < trigger[x].length; y++) {
      if (trigger[x][y] === text) {
        items = reply[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }

  return item;
};

const makeCurrentTime = () => {
  const today = new Date();

  let hour = today.getHours();
  let minute = today.getMinutes();
  const ampm = hour >= 12 ? "오후" : "오전";

  hour %= 12;
  hour = hour || 12;

  minute = minute < 10 ? "0" + minute : minute;

  const nowTime = `${ampm} ${hour}:${minute}`;

  return nowTime;
};

const output = (input) => {
  if (compare(trigger, reply, input)) product = compare(trigger, reply, input);
  else product = alternative[Math.floor(Math.random() * alternative.length)];

  msgState = [...msgState, { user: 0, date: makeCurrentTime(), msg: product }];

  render();
};

const userAddChat = () => {
  if ($inputMsg.value === "") return;

  msgState = [
    ...msgState,
    { user: 1, date: makeCurrentTime(), msg: $inputMsg.value },
  ];

  render();

  setTimeout(() => {
    output($inputMsg.value);
    $inputMsg.value = "";
  }, 300);
};

$inputMsg.onkeyup = (e) => {
  if (e.keyCode !== 13) return;
  userAddChat();
};
