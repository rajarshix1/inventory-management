const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const { commonResponse, generateToken } = require('../utils/utils');

async function createUser(req, res) {
    try {
        const { name, email, password, userType } = req.body;
        if (!name || !email || !password || !userType) {
            return commonResponse(res, false, 'All fields are required', 400);
        }
        if (password.length < 8) {
            return commonResponse(res, false, 'Password must be at least 8 characters long', 400);
        }
        if (!['Manager', 'Staff'].includes(userType)) {
            return commonResponse(res, false, 'Invalid user type', 400);
        }
        if (userType === 'Manager' && req.user.userType !== 'Owner') {
            return commonResponse(res, false, 'Only Owners can create Managers', 403);
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return commonResponse(res, false, 'Email already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            userType,
            tenantId: req.user.tenantId
        });
        commonResponse(res, true, {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType
        }, 201);
    } catch (err) {
        commonResponse(res, false, err.message);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return commonResponse(res, false, 'Email and password are required', 400);
        }
        const user = await User.findOne({ email }).populate('tenantId');
        if (!user) {
            return commonResponse(res, false, 'Invalid email');
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return commonResponse(res, false, 'Invalid password');
        }
        const accessToken = generateToken({ userId: user._id, tenantId: user.tenantId });
        commonResponse(res, true, {
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                tenantId: user.tenantId
            }
        });
    } catch (err) {
        commonResponse(res, false, err.message);
    }
}


module.exports = { createUser, login };
