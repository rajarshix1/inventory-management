const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function commonResponse(res, success, message, data, statusCode) {
    if (success) {
        statusCode = statusCode || 200;
        res.status(statusCode).json({ success: true, message: message,data: data });
    } else {
        statusCode = statusCode || 400;
        console.log('gg', message, data)
        res.status(statusCode).json({ success: false, message: message, error: data });
    }
}



module.exports = { generateToken, verifyToken, commonResponse };
