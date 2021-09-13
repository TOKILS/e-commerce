// "use strict";

// const { users } = require("../modules/index");

// module.exports = async (socket, next) => {
//   try {
//     if (!socket.handshake.auth.token) {
//       _authError();
//     }

//     const token = socket.handshake.auth.token.split(" ").pop();
//     const validUser = await users.authenticateToken(token);

//     socket.bearerAuthObj = validUser;

//     next();
//   } catch (e) {
//     _authError();
//   }

//   function _authError() {
//     next("Invalid Login");
//   }
// };
