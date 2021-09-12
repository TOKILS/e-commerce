"use strict";

const { users } = require("../modules/index.js");

module.exports = async (socket, next) => {
  try {
    if (!socket.handshake.auth.email) {
      _authError("no token sent");
    }
    // const token = socket.handshake.auth.token.split(" ").pop();
    // const validUser = await users.authenticateToken(token);

    // socket.bearerAuthObj = validUser;
    socket.bearerAuthObj = socket.handshake.auth.email;
    next();
  } catch (e) {
    _authError(e);
  }

  function _authError(error) {
    next("Invalid Login, " + error);
  }
};
