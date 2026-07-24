import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
} from '../services/token.service.js'

const REFRESH_COOKIE_NAME = 'refreshToken'
const cookieOpts = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    // sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches REFRESH_TOKEN_TTL
    path: 'api/v1/auth', // Send only to auth routes
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function login(req, res) {
    const { username, password } = req.body
    const user = await User.findOne({ username, active: true }).select('+passwordHash') // include passwordhash from Document
    if (!user) return res.status(401).json({ error: 'Invalid Credentials' })

    const isValid = await user.comparePassword(password)
    if (!isValid) return res.status(401).json({ error: 'Invalid username or password' })

    const accessToken = signAccessToken(user)
    const refreshToken = signRefreshToken(user)

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, cookieOpts)

    // Remove passwordHash and _id from response
    const userResponse = user.toObject()
    delete userResponse.passwordHash 
    delete userResponse._id
    
    res.json({
        accessToken,
        user: userResponse// exclude passwordHash
    })
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function refresh(req, res) {
    const token = req.cookies[REFRESH_COOKIE_NAME]
    if (!token) return res.status(401).json({ error: 'Invalid or expired refresh token' })

    let payload
    try {
        payload = verifyRefreshToken(token)
    } catch {
        return res.status(401).json({ error: 'Session no longer valid' })
    }

    const user = await User.findById(payload.sub)
    if (!user || !user.active || !user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({ error: 'Session no longer valid' })
    }

    const accessToken = signAccessToken(user)
    const newRefreshToken = signRefreshToken(user)
    res.cookie(REFRESH_COOKIE_NAME, { path: 'api/v1/auth' })
    res.json({ accessToken })
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function me(req, res) {
    const user = await User.findById(req.user.sub).select('-passwordHash')
    if (!user) return res.status(404).json({ error: 'User not found' })
}