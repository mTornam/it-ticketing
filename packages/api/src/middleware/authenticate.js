import { verifyAccessToken } from '../services/token.service.js'

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export default function authenticate(req, res, next) {
    const token = req.headers['authorization'].split(" ")[1]
    if (!token) { return res.status(401).json({ message: 'No token provided' }) }

    try {
        // verify token
        req.user = verifyAccessToken(token)
        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid or expired token'})
    }
}