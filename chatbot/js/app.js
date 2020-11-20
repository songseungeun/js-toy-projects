//  { user: 0, msg: '' }
// user > 0: robot, 1: user
let msgState = [];

const $inputMsg = document.querySelector(".input_msg");
const $msgBlock = document.querySelector(".msg_block");

const render = () => {
  let html = "";

  msgState.forEach((msgItem) => {
    if (msgItem.user === 0) {
      html += `
      <li class="bot_block">
        <div class="bot_icon"><i class="fas fa-robot"></i></div>
        <div class="bot_msg">${msgItem.msg}</div>
      </li>
    `;
    } else {
      html += `
      <li class="user_block">
        <div class="user_icon"><i class="fas fa-smile"></i></div>
        <div class="user_msg">${msgItem.msg}</div>
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

const output = (input) => {
  if (compare(trigger, reply, input)) product = compare(trigger, reply, input);
  else product = alternative[Math.floor(Math.random() * alternative.length)];

  msgState = [...msgState, { user: 0, msg: product }];

  render();
};

$inputMsg.onkeyup = (e) => {
  if (e.keyCode !== 13) return;

  msgState = [...msgState, { user: 1, msg: e.target.value }];

  render();

  setTimeout(() => {
    output(e.target.value);
    $inputMsg.value = "";
  }, 300);
};
