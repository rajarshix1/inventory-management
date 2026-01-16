const User = require('../models/users.model');
const { commonResponse, verifyToken } = require('../utils/utils');

async function auth(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return commonResponse(res, false, 'Failure', {}, 401);
        }
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return commonResponse(res, false, 'Failure', {}, 401);
        }
        req.user = user;
        next();
    } catch (err) {
        commonResponse(res, false, 'Failure', {}, 401);
    }
}

function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.userType)) {
            return commonResponse(res, false, 'Failure', {}, 403);
        }
        next();
    };
}

module.exports = { auth, authorize };
