// 'use strict';

const messageInput = document.getElementById("message-input");

const form = document.getElementById("form");

console.log("client.js file ran");
const socket = io("http://localhost:3050");

socket.on("connect", () => {
  displayMessage(`you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}`, "myMessages")

  displayMessage(`you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}`, "forMeMessages")
  displayMessage(`you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}`, "forMeMessages")
  displayMessage(`you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}`, "forMeMessages")
  displayMessage(`you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}you connected with id: ${socket.id}`, "forMeMessages")
})


form.addEventListener("submit", e => {
  e.preventDefault();
  let message = messageInput.value;
  console.log();
  
  if (message === "") return;

  displayMessage(message, "myMessages");

  messageInput.value = "";
});



function displayMessage(message, classType = "forMeMessages") {
  let divContainer = document.createElement("div");
  if (classType === "myMessages") {
    divContainer.setAttribute("class", "myMessagesContainer");
  } else {
    divContainer.setAttribute("class", "forMeMessagesContainer");
  }

  let div = document.createElement("div");
  div.setAttribute("class", classType)
  div.textContent = message;
  divContainer.append(div)
  let first = document.getElementById("message-container");
  if (first.firstChild) {
    document.getElementById("message-container").insertBefore(divContainer, first.firstChild);
  } else {
    document.getElementById("message-container").append(divContainer);
  }
}