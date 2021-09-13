'use strict';

module.exports = (err, req, res, next) => {
    const errorMsg = err.message ? err.message : err;
    const errorObj = {
        status: 500,
        route: req.path,
        message: errorMsg
    }
    res.status(500).json(errorObj);
}