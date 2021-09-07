'use strict';

module.exports = (req, res, next) => {
    console.log(`Request LOGGER 📝
     Request Methode: " ${req.method} " & 
     Requset Path: " ${req.path} " `);
    next();
}