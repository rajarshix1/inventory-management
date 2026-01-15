const jwt = require('jsonwebtoken');

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function commonResponse(res, success, dataOrMessage, statusCode = 200) {
    if (success) {
        res.status(statusCode).json({ success: true, data: dataOrMessage });
    } else {
        res.status(statusCode).json({ success: false, error: dataOrMessage });
    }
}



module.exports = { generateToken, verifyToken, commonResponse };
