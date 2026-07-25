import { verifyAccessToken } from '../services/token.service.js'

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export default function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Authorization token required'})
    }
    const token = authHeader.split(' ')[1]

    try {
        // verify token
        req.user = verifyAccessToken(token)
        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid or expired token'})
    }
}