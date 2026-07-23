import jwt from 'jsonwebtoken'

/**
* @param {import('../models/User.js').UserDocument} user
*/
export function signAccessToken(user) {
    return jwt.sign(
        { sub: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_TTL }
    )
}

/**
* @param {import('../models/User.js').UserDocument} user
*/
export function signRefreshToken(user) {
    return jwt.sign(
        { sub: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_TTL }
    )
}

export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}
