"use strict";
console.log("support.js is running");

// ? consts and variables
const form = document.getElementById("form");
const messageInput = document.getElementById("message-input");

const form2 = document.getElementById("form2");
const roomInput = document.getElementById("room-input");

const socket = io("http://localhost:3050");

let email = "suhaibersan@gmail.com";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = messageInput.value;
  console.log();

  if (message === "") return;

  displayMessage(message, "myMessages");
  sendMessageToIo(message, "suhaibersan@gmail.com");
  messageInput.value = "";
});

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  let room = roomInput.value;

  socket.emit("join-specific-room", room)
});

// ? socket code portion
// ! things to do when connected
socket.on("connect", async () => {
  await socket.emit("join-room", { email: email });
});

// ! socket.io send and receive
function sendMessageToIo(message) {
  socket.emit("send-message", { message });
}
socket.on("receive-message", (payload) => {
  /* payload = {
      message: "message here",
      email: "email here",
      roomID: "uuid here",
      messageType: "forMeMessages"
    } */
  displayMessage(payload.message, payload.messageType);
});

socket.on("info", (payload) => {
  displayMessage(payload.message, payload.messageType);
});

socket.on("receive-old-messages", (payload) => {
  for (let i = 0; i < payload.messages.length; i++) {
    displayMessage(payload.messages[i], 'forMeMessages');
  }  
});

// ! function to write messages to the HTML
function displayMessage(message, classType = "systemMessages") {
  let divContainer = document.createElement("div");
  if (classType === "myMessages") {
    divContainer.setAttribute("class", "myMessagesContainer");
  } else if (classType === "systemMessages") {
    divContainer.setAttribute("class", "systemMessagesContainer");
  } else {
    divContainer.setAttribute("class", "forMeMessagesContainer");
  }

  let div = document.createElement("div");
  div.setAttribute("class", classType);
  div.textContent = message;
  divContainer.append(div);
  let first = document.getElementById("message-container");
  if (first.firstChild) {
    document.getElementById("message-container").insertBefore(divContainer, first.firstChild);
  } else {
    document.getElementById("message-container").append(divContainer);
  }
}
