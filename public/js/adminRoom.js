(function connect() {
    console.log("support.js is running");
    // require('dotenv').config();
    // ? consts and variables
    const form = document.getElementById("form");
    const messageInput = document.getElementById("message-input");

    const form2 = document.getElementById("form2");
    const roomInput = document.getElementById("room-input");

    const roomsDivsContainer = document.getElementById("roomsDivsContainer");


    const socket = io();

    let email = `${Math.random()}`;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let message = messageInput.value;
        console.log();

        if (message === "") return;

        displayMessage(message, "myMessages");
        sendMessageToIo(message, email);
        messageInput.value = "";
    });

    // ? socket code portion
    // ! things to do when connected
    socket.on("connect", async () => {
        console.log("connect to io");
        await socket.emit("support-join-room", { email: email });
        socket.emit("request-all-rooms");
    });

    // ! socket.io send and receive
    function sendMessageToIo(message) {
        socket.emit("send-message", { message, messageSender: "admin" });
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
            if (payload.messages[i].messageSender === "user") {
                displayMessage(payload.messages[i].message, "forMeMessages");
            } else {
                displayMessage(payload.messages[i].message, "myMessages");
            }
        }
    });
    socket.on("receive-all-rooms", (rooms) => {
        console.log("receive-all-rooms ran");
        /*
        penRooms = [
          {
            email: "email here",
            room: "room here"
          }
        ] */
        document.getElementById("roomsDivsContainer").innerHTML = "";
        if (rooms) {
            for (let i = 0; i < rooms.length; i++) {
                displayRooms(rooms[i].email, rooms[i].room, rooms[i].issue);
            }
        }
    });
    function joinRoomFun(e) {
        e.preventDefault();
        let email = e.target.getAttribute("emailInfo");
        let room = e.target.getAttribute("roomInfo");

        document.getElementById("message-container").innerHTML = "";
        socket.emit("join-specific-room", { email, room });
    }
    function closeRoomFun(e) {
        e.preventDefault();
        let email = e.target.getAttribute("emailInfo");
        let room = e.target.getAttribute("roomInfo");

        socket.emit("close-specific-room", { email, room });

        e.target.parentNode.parentNode.remove();
    }

    // ! function to write rooms to the HTML
    function displayRooms(email, room, issue) {
        let mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "roomDiv");
        roomsDivsContainer.append(mainDiv);

        let textContainerDiv = document.createElement("div");
        textContainerDiv.setAttribute("class", "textContainerDiv");
        mainDiv.appendChild(textContainerDiv);

        let roomTextDiv = document.createElement("div");
        roomTextDiv.textContent = `room: ${room}`;
        textContainerDiv.appendChild(roomTextDiv);

        let emailTextDiv = document.createElement("div");
        emailTextDiv.textContent = `email: ${email}`;
        textContainerDiv.appendChild(emailTextDiv);

        let issueTextDiv = document.createElement("div");
        issueTextDiv.textContent = `issue: ${issue}`;
        textContainerDiv.appendChild(issueTextDiv);

        let buttonsContainer = document.createElement("div");
        buttonsContainer.setAttribute("class", "buttonsContainer");
        mainDiv.appendChild(buttonsContainer);

        let joinRoomButton = document.createElement("div");
        joinRoomButton.textContent = "join room";
        joinRoomButton.setAttribute("class", "joinRoomButton");
        joinRoomButton.setAttribute("emailInfo", email);
        joinRoomButton.setAttribute("roomInfo", room);
        buttonsContainer.appendChild(joinRoomButton);
        joinRoomButton.addEventListener("click", joinRoomFun);

        let closeRoomButton = document.createElement("div");
        closeRoomButton.textContent = "close room";
        closeRoomButton.setAttribute("class", "closeRoomButton");
        closeRoomButton.setAttribute("emailInfo", email);
        closeRoomButton.setAttribute("roomInfo", room);
        buttonsContainer.appendChild(closeRoomButton);
        closeRoomButton.addEventListener("click", closeRoomFun);
    }
    // ! function to write messages to the HTML
    function displayMessage(message, classType = "systemMessages") {
        let divContainer = document.createElement("div");
        if (classType === "myMessages") {
            divContainer.setAttribute("class", "myMessagesContainer");
        } else if (classType === "systemMessages") {
            divContainer.setAttribute("class", "systemMessagesContainer");
        } else if (classType === "systemMessagesPositive") {
            divContainer.setAttribute("class", "systemMessagesPositiveContainer");
        } else {
            divContainer.setAttribute("class", "forMeMessagesContainer");
        }

        let div = document.createElement("div");
        div.setAttribute("class", classType);
        div.textContent = message;
        divContainer.append(div);
        let first = document.getElementById("message-container");
        if (first.firstChild) {
            document
                .getElementById("message-container")
                .insertBefore(divContainer, first.firstChild);
        } else {
            document.getElementById("message-container").append(divContainer);
        }
    }

})()