(function connect() {
    console.log("client.js is running");
    require('dotenv').config();
    // ? consts and variables
    const messageForm = document.getElementById("form");
    const messageInput = document.getElementById("message-input");

    const roomForm = document.getElementById("form2");
    const roomInput = document.getElementById("room-input");

    const socket = io(`${process.env.HOST}`);

    let email = "";

    const emailForm = document.getElementById("email-form");
    const emailInput = document.getElementById("email-input");

    emailForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        email = emailInput.value;
        if (email === "") return;
        emailInput.value = "";

        let issue = document.getElementById("issue-input");

        document.getElementById("message-container").innerHTML = "";

        await socket.emit("join-room", { email: email, issue: issue.value });
        document.getElementById("email-form").remove();

        setTimeout(() => {
            displayMessage("a support staff will join you soon", "systemMessagesPositive");
        }, 2500);
    });

    messageForm.addEventListener("submit", (e) => {
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
    socket.on("connect", async () => { });

    // ! socket.io send and receive
    function sendMessageToIo(message) {
        socket.emit("send-message", { message, messageSender: "user" });
    }
    socket.on("receive-message", (payload) => {
        /* payload = {
            message: "message here",
            messageType: "forMeMessages",
            drawMessage: "true"
          } */
        console.log("receive-message ran with drawMessage = ", payload.drawMessage);
        if (payload.drawMessage === "true") {
            displayMessage(payload.message, payload.messageType);
        } else {
            displayMessage("you are not in an active room", "systemMessages");
        }
    });

    socket.on("info", (payload) => {
        displayMessage(payload.message, payload.messageType);
    });

    socket.on("receive-old-messages", (payload) => {
        for (let i = 0; i < payload.messages.length; i++) {
            if (payload.messages[i].messageSender === "user") {
                displayMessage(payload.messages[i].message, "myMessages");
            } else {
                displayMessage(payload.messages[i].message, "forMeMessages");
            }
        }
    });

    // ! function to write messages to the HTML
    function displayMessage(message, classType = "systemMessages") {
        let divContainer = document.createElement("div");
        if (classType === "myMessages") {
            divContainer.setAttribute("class", "myMessagesContainer");
        } else if (classType === "forMeMessages") {
            divContainer.setAttribute("class", "forMeMessagesContainer");
        } else if (classType === "systemMessagesPositive") {
            divContainer.setAttribute("class", "systemMessagesPositiveContainer");
        } else {
            divContainer.setAttribute("class", "systemMessagesContainer");
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

})()